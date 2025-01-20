from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/init/<int:num_players>", methods=["GET"])
def init_game(num_players):
    # Logic to initialize the game with the given number of players
    return jsonify({"message": f"Game initialized with {num_players} players"}), 200


@app.route("/hit-bell/<int:player_id>", methods=["GET"])
def hit_bell(player_id):
    # Logic for when a player hits the bell
    return jsonify({"message": f"Player {player_id} hit the bell"}), 200


@app.route("/flip-card/<int:player_id>", methods=["GET"])
def flip_card(player_id):
    # Logic for when a player flips a card
    return jsonify({"message": f"Player {player_id} flipped a card"}), 200


@app.route("/", methods=["GET"])
def welcome():
    return "Welcome to Fruit Punch Online Multiplayer Game", 200


if __name__ == "__main__":
    app.run(debug=True)
