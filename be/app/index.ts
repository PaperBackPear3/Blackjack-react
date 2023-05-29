import http from "http";
//import { BjWebSocket } from "./BjWebSocket"
import WebSocket, { WebSocketServer } from 'ws';
import crypto from 'crypto';
import { createTestDeck } from "./helpers/cardsHelper";
import { Deck } from "./definitions/symbols/definition";
import express from "express";
import cors from "cors";
import session from "express-session";

declare module 'express-session' {
    export interface SessionData {
        userId: string;
    }
}
const clients: Map<string, WebSocket> = new Map();


// Spinning the http server and the WebSocket server.

const app = express()
app.use(cors())

const sessionParser = session({
    saveUninitialized: false,
    secret: '$eCuRiTy', //TODO find better secret, this is for testing 
    resave: false
});

//
// Serve static files from the 'public' folder.
//
app.use(express.static('public'));
app.use(sessionParser);

app.post('/api/v1/login', function (req, res) {
    //
    // "Log in" user and set userId to session.
    //
    const userId = crypto.randomUUID()
    console.log(`Updating session for user ${userId}`);
    req.session.userId = userId;
    res.send({ result: 'OK', message: 'Session updated' });
});

app.delete('/api/v1/logout', function (request, response) {
    const ws = clients.get(request.session.userId!);

    console.log('Destroying session');
    request.session.destroy(function () {
        if (ws) ws.close();

        response.send({ result: 'OK', message: 'Session destroyed' });
    });
});

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

    console.log('Parsing session from request...');

    sessionParser(request, {}, () => {
        console.log(JSON.stringify(request))
        if (!request.session.userId) {
            socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
            socket.destroy();
            return;
        }

        console.log('Session is parsed!');

        socket.removeListener('error', console.error);

        wss.handleUpgrade(request, socket, head, function (ws) {
            wss.emit('connection', ws, request);
        });
    });
});

wss.on('connection', function (ws, request) {
    const userId = request.session.userId!;

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
                wss.clients.forEach(function each(player) {
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