import exp from "constants";
import { Deck } from "../symbols/definition"
import { Socket } from "socket.io";


export type clientData = {
    webSocket: Socket,
    isSpectating: boolean,
}

export type roomData = {
    owner: string,
    players: Map<string, clientData>,
    deck: Deck[],
    gameStarted: boolean,
    gameEnded: boolean,
}

export type RoomMessageData = {
    roomId: string,
    userId: string,
}

export type MessageData = {
    roomId: string,
    message: string,
}