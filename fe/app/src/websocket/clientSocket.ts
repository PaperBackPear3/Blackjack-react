import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../common/types/socketIoTypes";



const WS_URL = 'ws://127.0.0.1:8080';

export const clientSocket: Socket<ServerToClientEvents, ClientToServerEvents> = io(WS_URL, {
    autoConnect: false
});