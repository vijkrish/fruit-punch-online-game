import random


class Card:
    def __init__(self, fruit, number):
        self.fruit = fruit
        self.number = number

    def __repr__(self):
        return f"{self.number} {self.fruit}"


def initialize_cards():
    fruits = ["Banana", "Lime", "Pear", "Grape"]
    cards = []

    for fruit in fruits:
        for number in range(1, 5):
            for _ in range(3):
                cards.append(Card(fruit, number))

        # Add two cards of number 5 for each fruit
        cards.extend([Card(fruit, 5), Card(fruit, 5)])

    return cards


def setup_game():
    cards = initialize_cards()
    random.shuffle(cards)
    return cards


# game_cards = setup_game()
# print(game_cards)
