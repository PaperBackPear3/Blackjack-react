import { Deck } from "../../common/definitions/symbols/definition";
import { RoomMessageData, roomData } from "../../common/definitions/types";
import { createTestDeck } from "../cardsHelper";

export function gameSetUp(room: roomData): roomData {
    const deck: Deck = createTestDeck()
    deck.cards.sort((a, b) => 0.5 - Math.random())
    room.deck.push(deck)
    room.gameStarted = true
    return room;
}