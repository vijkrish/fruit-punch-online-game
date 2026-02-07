from flask import Flask, jsonify
from flask_cors import CORS

from utils.card import setup_game
from utils.gamegen import create_session_id
from utils.pile import Pile
from utils.player import Player

app = Flask(__name__)
CORS(app)

sessions = {}  # Dict[str, dict] — all game state keyed by session_id

print("Everything is ready to go!")


def get_session(session_id):
    """Look up a session by ID. Returns (session, None) or (None, error_response)."""
    session = sessions.get(str(session_id))
    if session is None:
        return None, (jsonify({"error": f"Session {session_id} not found"}), 404)
    return session, None


def set_next_player_turn(session):
    players = session["players"]
    current_player_index = session["current_player_index"]

    players[current_player_index].set_turn(False)
    next_player_index = (current_player_index + 1) % len(players)

    # Skip players with no cards remaining
    attempts = 0
    while attempts < len(players):
        candidate = players[next_player_index]
        if candidate.get_num_cards_on_hand() > 0 or candidate.top_card is not None:
            break
        next_player_index = (next_player_index + 1) % len(players)
        attempts += 1

    players[next_player_index].set_turn(True)
    session["current_player_index"] = next_player_index

    return next_player_index


def check_game_over(session):
    """Check if only one player has cards left."""
    players = session["players"]
    players_with_cards = [p for p in players if p.get_num_cards_on_hand() > 0 or p.top_card is not None]
    if len(players_with_cards) == 1:
        return True, players_with_cards[0]
    return False, None


@app.route("/host-game/<playername>", methods=["GET"])
def host_game(playername):
    session_id = str(create_session_id())
    new_player = Player(name=playername)

    sessions[session_id] = {
        "players": [new_player],
        "cards": None,
        "pile": Pile(),
        "current_player_index": 0,
        "started": False,
    }

    print(f"Session {session_id} created by {playername}")
    return jsonify({"session_id": session_id, "player_id": 0}), 200


@app.route("/join/<session_id>/<playername>", methods=["GET"])
def join(session_id, playername):
    session, error = get_session(session_id)
    if error:
        return error

    if session["started"]:
        return jsonify({"error": "Game already started"}), 400

    new_player = Player(name=playername)
    session["players"].append(new_player)
    player_id = len(session["players"]) - 1

    print(f"{playername} joined session {session_id} as player {player_id}")
    return jsonify({"message": f"Player {playername} has joined the game", "player_id": player_id}), 200


@app.route("/start/<session_id>", methods=["GET"])
def start_game(session_id):
    session, error = get_session(session_id)
    if error:
        return error

    players = session["players"]
    num_players = len(players)

    if num_players < 2:
        return jsonify({"error": "Need at least 2 players to start"}), 400

    # Deal cards
    cards = setup_game()
    for i, player in enumerate(players):
        player.pile_of_cards = []
        player.top_card = None
        player.is_turn = False
        player.collect_cards(cards[i::num_players])

    players[0].set_turn(True)
    session["current_player_index"] = 0
    session["started"] = True

    print(f"Session {session_id} started with {num_players} players")
    return jsonify({"message": f"Game started with {num_players} players"}), 200


@app.route("/state/<session_id>", methods=["GET"])
def get_game_state(session_id):
    session, error = get_session(session_id)
    if error:
        return error

    players = session["players"]
    pile = session["pile"]

    player_states = [
        {
            "player_id": i,
            "name": player.name,
            "top_card": {
                "fruit": player.get_top_card().fruit if player.get_top_card() else "",
                "quantity": player.get_top_card().number if player.get_top_card() else 0,
            },
            "num_cards": player.get_num_cards_on_hand(),
        }
        for i, player in enumerate(players)
    ]

    num_cards_in_pile = pile.get_num_cards()
    game_over, winner = check_game_over(session)

    return (
        jsonify(
            {
                "current_player_id": session["current_player_index"],
                "players": player_states,
                "num_cards_in_pile": num_cards_in_pile,
                "game_over": game_over,
                "winner": winner.name if winner else None,
                "started": session["started"],
            }
        ),
        200,
    )


@app.route("/flip-card/<session_id>/<int:player_id>", methods=["GET"])
def flip_card(session_id, player_id):
    session, error = get_session(session_id)
    if error:
        return error

    players = session["players"]
    pile = session["pile"]

    if 0 <= player_id < len(players):
        player = players[player_id]
        if player.is_turn:
            try:
                flipped_card = player.flip_card()
                pile.play_card(flipped_card)
                next_player_index = set_next_player_turn(session)
                return (
                    jsonify(
                        {
                            "message": f"Player {player_id} flipped a card",
                            "top_card_fruit": flipped_card.fruit,
                            "top_card_quantity": flipped_card.number,
                            "next_turn": next_player_index,
                        }
                    ),
                    200,
                )
            except Exception as e:
                return jsonify({"error": str(e)}), 400
        else:
            return jsonify({"error": "It's not this player's turn"}), 400
    else:
        return jsonify({"error": "Invalid player ID"}), 400


@app.route("/hit-bell/<session_id>/<int:player_id>", methods=["GET"])
def hit_bell(session_id, player_id):
    session, error = get_session(session_id)
    if error:
        return error

    players = session["players"]
    pile = session["pile"]

    if 0 <= player_id < len(players):
        all_player_top_cards = [
            player.get_top_card() for player in players if player.top_card is not None
        ]

        if pile.check_bell_hit(all_player_top_cards):
            winning_player = players[player_id]
            collected_cards = pile.collect_cards()
            winning_player.collect_cards(collected_cards)

            for player in players:
                player.top_card = None

            return (
                jsonify(
                    {
                        "message": f"{winning_player.name} hit the bell and won the round!",
                        "collected_cards": [str(card) for card in collected_cards],
                    }
                ),
                200,
            )
        else:
            offending_player = players[player_id]
            cards_given = 0
            for other_player in players:
                if other_player is not offending_player:
                    if offending_player.pile_of_cards:
                        card = offending_player.pile_of_cards.pop()
                        other_player.collect_cards([card])
                        cards_given += 1
            return (
                jsonify({"message": f"Bell hit incorrectly! {offending_player.name} gave {cards_given} card(s) as penalty."}),
                200,
            )
    else:
        return jsonify({"error": "Invalid player ID"}), 400


@app.route("/", methods=["GET"])
def welcome():
    return "Welcome to Fruit Punch Online Multiplayer Game", 200


if __name__ == "__main__":
    app.run(debug=True)
