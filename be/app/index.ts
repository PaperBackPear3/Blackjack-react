import http from "http";
//import { BjWebSocket } from "./BjWebSocket"
import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';
import { createTestDeck } from "./helpers/cardsHelper";
import { Deck } from "../../common/definitions/symbols/definition";
import express from "express";
import cors from "cors";

const clients: Map<string, WebSocket> = new Map();


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

    clients.set(userId, ws);

    ws.on('error', console.error);

    ws.on('message', function (message) {
        //
        // Here we can now use session parameters.
        //
        console.log(`Received message ${message} from user ${userId}`);
    });

    ws.on('close', function () {
        clients.delete(userId);
    });

    ws.onmessage = function (event) {
        switch (event.data) {
            case 'startGame':
                var deck: Deck = createTestDeck()
                //TODO add check player is already in a match
                console.log(deck)
                clients.forEach(function each(player) {
                    player.send(JSON.stringify(deck))
                })
                break;
            case 'stop':
                console.log('stop');
                break;
            case 'reset':
                console.log('reset');
                break;
            default:
                console.log('default');
        }
    };
});

//
// Start the server.
//
server.listen(8080, function () {
    console.log('Listening on http://localhost:8080');
});