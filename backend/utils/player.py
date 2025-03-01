from typing import List

from utils.card import Card


class Player:
    def __init__(self, name):
        self.name = name
        self.pile_of_cards = []  # This will hold Card objects
        self.is_turn = False
        self.top_card = None

    def collect_cards(self, cards: List[Card]):
        """Add the collected cards to the player's bottom of the pile."""
        self.pile_of_cards = cards + self.pile_of_cards
        self.flip_card()

    def flip_card(self) -> Card:
        """flips the top card from the player's pile."""
        if self.pile_of_cards:
            self.top_card = self.pile_of_cards.pop()
            return self.top_card
        raise Exception("No cards left to flip")

    def get_top_card(self) -> Card:
        """Return the top card from the player's pile."""
        if not self.top_card:
            return Card(fruit="", number=0)
        return self.top_card

    def get_num_cards_on_hand(self) -> int:
        """Return the number of cards the player has."""
        return len(self.pile_of_cards)

    def set_turn(self, is_turn):
        """Set the player's turn status."""
        self.is_turn = is_turn

    def __str__(self):
        return f"Player(name={self.name}, is_turn={self.is_turn}, pile_size={len(self.pile_of_cards)})"


def initialize_players(num_players, cards: List[Card]):
    """Initialize the players and distributes the given number of cards."""
    players = []
    for i in range(num_players):
        player = Player(f"Player {i+1}")
        player.collect_cards(cards[i::num_players])
        players.append(player)
    return players
