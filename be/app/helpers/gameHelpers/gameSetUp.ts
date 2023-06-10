import { Deck } from "card-games-types/cards";
import { roomData } from "card-games-types/room";
import { createTestDeck } from "../cardsHelper";

export function gameSetUp(room: roomData): roomData {
    const deck: Deck = createTestDeck()
    deck.cards.sort((a, b) => 0.5 - Math.random())
    room.deck.push(deck)
    room.gameStarted = true
    return room;
}