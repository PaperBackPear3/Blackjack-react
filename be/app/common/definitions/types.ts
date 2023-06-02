import exp from "constants";
import { Deck } from "./symbols/definition"
import WebSocket from 'ws';


export type clientData = {
    webSocket: WebSocket,
    isSpectating: boolean
}

export type roomData = {
    owner: string,
    players: Map<string, clientData>,
    deck: Deck[]
    gameStarted: boolean
    gameEnded: boolean
}

export type RoomMessageData = {
    roomId: string,
    userId: string,
}

export type MessageData = {
    roomId: string,
    message: string
}