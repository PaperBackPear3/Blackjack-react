//import { WebSocketServer } from "ws";
import http from "http";
import { BjWebSocket } from "./BjWebSocket"
import WebSocket from 'ws';
import crypto from 'crypto';


// Spinning the http server and the WebSocket server.
const server = http.createServer();

const bjWsServer = new WebSocket.WebSocketServer<BjWebSocket>({
    WebSocket: BjWebSocket,
    server: server
});


const port = 8080;
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients: any = {};

// A new client connection request received
bjWsServer.on('connection', function (connection) {
    // Generate a unique code for every user
    const userId = crypto.randomUUID()
    console.log(`Recieved a new connection.`);
    //console.log(connection)
    // Store the new connection and handle messages
    clients[userId] = connection;
    console.log(`${userId} connected.`);

    //connection.on('message', function message(data)
    connection.onmessage = function (event) {
        console.log(`Message received: ${event.data}`);
        // Broadcast the incoming message to all users
        for (const key in clients) {
            console.log(key, event.data);
            clients[key].send(userId + ' mi hai scritto: ' + event.data);
        }
    };

    connection.onclose = function (event) {
        console.log('connection closed', clients);
        delete clients[userId];
    }

    connection.on('error', console.error);

    connection.send('something');
});