import http from "http";
//import { BjWebSocket } from "./BjWebSocket"
import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import { createTestDeck } from "./helpers/cardsHelper";
import { Deck } from "./common/definitions/symbols/definition";
import express from "express";
import cors from "cors";
import { RoomMessageData, clientData, roomData, } from "./common/definitions/types";
import { error } from "console";
import { gameSetUp } from "./helpers/gameHelpers/gameSetUp";

const rooms: Map<string, roomData> = new Map();

// Spinning the http server and the WebSocket server.

const app = express()
app.use(cors())

//
// Serve static files from the 'public' folder.
//
app.use(express.static('public'));

//
// Create an HTTP server.
//
const server = http.createServer(app);

//
// Create a WebSocket server completely detached from the HTTP server.
//
const wss = new WebSocketServer({ clientTracking: false, noServer: true });

server.on('upgrade', function (request, socket, head) {
    socket.on('error', console.error);

    wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit('connection', ws, request);
    });

});

wss.on('connection', function (ws, request) {

    const userId = crypto.randomUUID()

    const newUser: clientData = {
        webSocket: ws,
        isSpectating: true
    }

    const roomId = Math.random().toString(30).slice(2, 8).toUpperCase()

    const room: roomData = {
        owner: userId,
        players: new Map<string, clientData>().set(userId, newUser),
        deck: [],
        gameStarted: false,
        gameEnded: false
    }
    rooms.set(roomId, room);

    ws.on('joinRoom', function joinRoom(data: RoomMessageData) {
        console.log('joinRoom');
        
        rooms.get(data.roomId)?.players.set(userId, newUser);
        rooms.delete(roomId);
    })

    ws.on('leaveRoom', function leaveRoom(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", userId, ' leaveRoom');
        rooms.get(data.roomId)?.players.delete(data.userId);
    })

    ws.on('spectate', function spectate(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", userId, ' spectateRoom');
        var userData = rooms.get(data.roomId)?.players.get(data.userId)
        if (!userData)
            throw error;
        userData.isSpectating = true;
        rooms.get(data.roomId)?.players.set(data.userId, userData)
    })

    ws.on('startGame', function startGame(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", userId, ' startGame');
        var roomData = rooms.get(data.roomId)
        if (!roomData)
            throw error;

        rooms.set(data.roomId, gameSetUp(roomData))
    }
    )

    ws.on('stop', function stopGame(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", userId, ' stop');
        rooms.get(data.roomId)?.players.delete(data.userId);
    })

    ws.on('reset', function resetRoom(data: RoomMessageData) {
        console.log('received: ', data.userId, " ", userId, ' reset');
        rooms.get(data.roomId)?.players.delete(data.userId);
    })



    ws.on('close', function () {
        rooms.delete(roomId);
    });
    ws.on('error', console.error);
});

//
// Start the server.
//
server.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});