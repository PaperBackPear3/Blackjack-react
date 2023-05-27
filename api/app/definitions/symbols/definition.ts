export type Symbol = {
    name: string;
    image: string;
}

export type Card = {
    symbol: Symbol;
    value: number;
    image: string;
}

export type Deck = {
    cards: Card[];
}