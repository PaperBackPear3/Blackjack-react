//import { BjWebSocket } from "./BjWebSocket"
import express from "express";
import cors from "cors";
import { CallbackResponseData, ClientToServerEvents, GameAction, InterServerEvents, RoomMessageData, ServerToClientEvents, SocketData, clientData, roomData, } from "./common/types/types";
import { error } from "console";
import { gameSetUp } from "./helpers/gameHelpers/gameSetUp";
import { Server } from "socket.io";
import { createServer } from 'http';

const rooms: Map<string, roomData> = new Map();

// Spinning the http server and the WebSocket server.

const app = express()
app.use(cors())
const HttpServer = createServer(app);

//
// Create a WebSocket server completely detached from the HTTP server.
//
const ioWss = new Server
    <
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >
    (HttpServer, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });



ioWss.on('connection', (socket) => {


    console.log('start', socket.id);
    //const userId = crypto.randomUUID()
    const roomId = Math.random().toString(30).slice(2, 8).toUpperCase()
    //socket.data
    socket.emit('clientRoomId', roomId)

    socket.on('error', console.error);

    socket.on("disconnect", (reason) => {
        console.log(socket.id, " disconnecting... ", reason);
    })

    const newUser: clientData = {
        webSocket: socket,
        isSpectating: true
    }

    const room: roomData = {
        owner: socket.id,
        players: new Map<string, clientData>().set(socket.id, newUser),
        deck: [],
        gameStarted: false,
        gameEnded: false
    }
    rooms.set(roomId, room);

    socket.on('joinRoom', function joinRoom(data: RoomMessageData, callback: (CallbackResponse: CallbackResponseData) => void) {
        console.log('joinRoom', data);
        var roomToJoinId = data.roomId.toUpperCase()
        var roomToJoin = rooms.get(roomToJoinId);
        if (!roomToJoin || roomToJoin === undefined) {
            callback({
                success: false,
                type: 'roomError',
                message: 'Room not found',
            });
            return;
        }
        roomToJoin.players.set(data.userId, newUser);
        rooms.set(data.roomId, roomToJoin);
        rooms.delete(roomId);
        callback({
            success: true,
            type: 'roomSuccess',
            message: `Joined Room: ${roomToJoinId}`,
            data: roomToJoinId
        });
        rooms.get(roomToJoinId)?.players.forEach((player, id) => {
            if (id !== data.userId)
                player.webSocket.emit('roomEvent', {
                    success: true,
                    type: 'userHasJoinedRoom',
                    message: `${data.userId} has joined the room`
                });
        })
    });

    socket.on('leaveRoom', function leaveRoom(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", socket.id, ' leaveRoom');
        rooms.get(data.roomId)?.players.delete(data.userId);
    })

    socket.on('spectate', function spectate(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", socket.id, ' spectateRoom');
        var userData = rooms.get(data.roomId)?.players.get(data.userId)
        if (!userData)
            throw error;
        userData.isSpectating = true;
        rooms.get(data.roomId)?.players.set(data.userId, userData)
    })

    socket.on('startGame', function startGame(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", socket.id, ' startGame');
        var roomData = rooms.get(data.roomId)
        if (!roomData)
            throw error;

        rooms.set(data.roomId, gameSetUp(roomData))
    }
    )

    socket.on("bet", function bet(params: GameAction) {
        return true;
    });

    // socket.on('stop', function stopGame(data: RoomMessageData) {
    //     console.log('received: ', data.userId, " ", socket.id, ' stop');
    //     rooms.get(data.roomId)?.players.delete(data.userId);
    // })

    // socket.on('reset', function resetRoom(data: RoomMessageData) {
    //     console.log('received: ', data.userId, " ", socket.id, ' reset');
    //     rooms.get(data.roomId)?.players.delete(data.userId);
    // })

});
//
// Start the server.
//
HttpServer.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});