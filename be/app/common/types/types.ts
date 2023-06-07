import exp from "constants";
import { Deck } from "../symbols/definition"
import { Socket } from "socket.io";
import { type } from "os";

export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    clientRoomId: (data: string) => void;
    roomEvent: (data: MessageData) => void;
}

export interface ClientToServerEvents {
    joinRoom: (data: RoomMessageData, callback: (CallbackResponseData: CallbackResponseData) => void) => void;
    leaveRoom: (data: RoomMessageData, callback: (CallbackResponseData: CallbackResponseData) => void) => void;
    spectate: (data: RoomMessageData, callback: (CallbackResponseData: CallbackResponseData) => void) => void;
    startGame: (data: RoomMessageData, callback: (CallbackResponseData: CallbackResponseData) => void) => void;
    playerAction: (data: MessageData) => void;
    bet: (data: GameAction, callback: (CallbackResponseData: CallbackResponseData) => void) => boolean;
    skip: (data: GameAction, callback: (CallbackResponseData: CallbackResponseData) => void) => boolean;
    draw: (data: GameAction, callback: (CallbackResponseData: CallbackResponseData) => void) => boolean;

}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}

export type clientData = {
    webSocket: Socket,
    //username: string,
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
    success: boolean,
    type: string,
    message: string,
    data?: string,
}

export type GameAction = {
    userId: string,
    data: string | number | boolean,
}

export type CallbackResponseData = {
    success: boolean,
    type: string,
    message: string,
    data?: string,
}