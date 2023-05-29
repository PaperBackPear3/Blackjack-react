export type Symbol = {
    name: string;
    color: string;
    image: string;
}

export type Card = {
    symbol: Symbol;
    value: number;
    image: string;
    altText:string;
}

export type Deck = {
    cards: Card[];
}