class Pile:
    def __init__(self):
        self.played_cards = []
    
    def play_card(self, card):
        self.played_cards.append(card)
    
    def collect_cards(self):
        return self.played_cards

    def check_bell_hit(self, all_player_top_cards):
        fruit_counts = {}
        for card in all_player_top_cards:
            if card.fruit in fruit_counts:
                fruit_counts[card.fruit] += card.number
            else:
                fruit_counts[card.fruit] = card.number
            if fruit_counts[card.fruit] == 5:
                return True
        return False