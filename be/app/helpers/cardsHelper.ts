import { Card, CardSymbol, Deck } from "card-games-types/cards";



export function createTestDeck(): Deck {
    var symbols: CardSymbol[] = [
        { name: 'Heart', color: 'red', image: '' },
        { name: 'Spade', color: 'black', image: '' },
        { name: 'Diamond', color: 'red', image: '' },
        { name: 'Club', color: 'black', image: '' }
    ];
    return CreateDeck(symbols, 52);
}

export function CreateDeck(symbols: CardSymbol[], cardsQuantity: number): Deck {
    const CARDS_PER_SYMBOL = cardsQuantity / symbols.length
    var cards: Card[] = [];
    var deck: Deck = {} as Deck
    symbols.forEach(symbol => {
        for (let i = 1; i <= CARDS_PER_SYMBOL; i++) {
            cards.push({ symbol: symbol, value: i, image: '', altText: `${i} of ${symbol.name}` })
        }
    });
    deck.cards = cards;
    return deck;
}

export function turn(deck: Deck, cardsQuantity: number): { updatedDeck: Deck, playerCards: Card[] } {
    const playerCards = deck.cards.splice(0, cardsQuantity)
    const updatedDeck = deck
    return { updatedDeck: updatedDeck, playerCards: playerCards };
}