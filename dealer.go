package main

func createDeck() []Card {
	suits := []string{"heart", "diamond", "club", "spade"}
	values := []string{"1", "2", "3", "4", "5", "6", "7", "8", "9", "K", "Q", "J", "A"}

	deck := []Card{}

	for _, suit := range suits {
		for _, val := range values {
			card := Card{Value: val, Suit: suit}
			deck = append(deck, card)
		}
	}

	return deck
}