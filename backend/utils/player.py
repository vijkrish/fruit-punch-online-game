from typing import List

from initialize_cards import Card


class Player:
    def __init__(self, name):
        self.name = name
        self.pile_of_cards = []  # This will hold Card objects
        self.is_turn = False

    def collect_cards(self, cards: List[Card]):
        """Add the collected cards to the player's bottom of the pile."""
        self.pile_of_cards = cards + self.pile_of_cards

    def flip_card(self) -> Card:
        """Remove the top card from the player's pile."""
        if self.pile_of_cards:
            return self.pile_of_cards.pop()
        raise Exception("No cards left to flip")

    def set_turn(self, is_turn):
        """Set the player's turn status."""
        self.is_turn = is_turn

    def __str__(self):
        return f"Player(name={self.name}, is_turn={self.is_turn}, pile_size={len(self.pile_of_cards)})"
