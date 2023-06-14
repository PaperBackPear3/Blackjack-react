import { Deck } from "card-games-types/cards";
import { roomData } from "card-games-types/room";
import { createTestDeck } from "../cardsHelper";

export function gameSetUp(room: roomData): roomData {
    room.deck.cards.sort((a, b) => 0.5 - Math.random())
    room.gameStarted = true
    return room;
}