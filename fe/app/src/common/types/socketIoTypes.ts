export interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
}

export type RoomMessageData = {
    roomId: string,
    userId: string,
}

export type MessageData = {
    roomId: string,
    message: string
}

export interface ClientToServerEvents {
    joinRoom: (data: RoomMessageData) => void;
    leaveRoom: () => void;
    spectate: () => void;
    startGame: () => void;

}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}