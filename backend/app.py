from typing import List

from flask import Flask, jsonify
from flask_cors import CORS  # Import CORS

from utils.card import Card, setup_game
from utils.pile import Pile
from utils.player import initialize_players, Player

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

cards: List[Card] = setup_game()
players: List[Player] = []
current_player_index = 0
pile: Pile = Pile()

def set_next_player_turn():
    global players, current_player_index
    players[current_player_index].set_turn(False)
    next_player_index = (current_player_index + 1) % len(players)
    players[next_player_index].set_turn(True)

    # Update the current player id
    current_player_index = next_player_index

    return next_player_index


@app.route("/init/<int:num_players>", methods=["GET"])
def init_game(num_players):
    # Logic to initialize the game with the given number of players
    global players
    players = initialize_players(num_players=num_players, cards=cards)
    if players:
        players[0].set_turn(True)

    return jsonify({"message": f"Game initialized with {num_players} players"}), 200


@app.route("/hit-bell/<int:player_id>", methods=["GET"])
def hit_bell(player_id):
    global players, pile

    if 0 <= player_id < len(players):
        all_player_top_cards = [
            player.get_top_card() for player in players if player.get_top_card()
        ]

        if pile.check_bell_hit(all_player_top_cards):
            winning_player = players[player_id]
            collected_cards = pile.collect_cards()
            winning_player.collect_cards(collected_cards)

            return (
                jsonify(
                    {
                        "message": f"Player {player_id} hit the bell and won the round!",
                        "collected_cards": [str(card) for card in collected_cards],
                    }
                ),
                200,
            )
        else:
            return (
                jsonify({"message": "Bell hit incorrectly. No cards collected."}),
                200,
            )
    else:
        return jsonify({"error": "Invalid player ID"}), 400


@app.route("/flip-card/<int:player_id>", methods=["GET"])
def flip_card(player_id):
    global players, pile

    print(f"Got a request: {player_id}")
    if 0 <= player_id < len(players):
        player = players[player_id]
        if player.is_turn:
            try:
                flipped_card = player.flip_card()
                pile.play_card(flipped_card)
                next_player_index = set_next_player_turn()
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

@app.route("/state", methods=["GET"])
def get_game_state():
    global players, pile, current_player_index
    player_states = [
        {
            "player_id": i,
            "top_card": {
                "fruit": player.get_top_card().fruit if player.get_top_card() else "",
                "quantity": player.get_top_card().number if player.get_top_card() else 0,
            }
        }
        for i, player in enumerate(players)
    ]

    num_cards_in_pile = pile.get_num_cards()

    return jsonify(
        {
            "current_player_id": current_player_index,
            "players": player_states,
            "num_cards_in_pile": num_cards_in_pile,
        }
    ), 200


@app.route("/", methods=["GET"])
def welcome():
    return "Welcome to Fruit Punch Online Multiplayer Game", 200


if __name__ == "__main__":
    app.run(debug=True)
