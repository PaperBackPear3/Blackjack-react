//import { WebSocketServer } from "ws";
import * as http from "http";
import { v4 as uuidv4 } from 'uuid';
import { BjWebSocket } from "./BjWebSocket"

// Spinning the http server and the WebSocket server.
const server = http.createServer();
const bjWsServer = new BjWebSocket(server);

const port = 8080;
server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
});

// I'm maintaining all active connections in this object
const clients: any = {};

// A new client connection request received
bjWsServer.on('connection', function (connection) {
    // Generate a unique code for every user
    const userId = uuidv4();
    console.log(`Recieved a new connection.`);
    //console.log(connection)
    // Store the new connection and handle messages
    clients[userId] = connection;
    console.log(`${userId} connected.`);

    //connection.on('message', function message(data)
    connection.onmessage = function (event) {
        console.log(`Message received: ${event.data}`);
        // Broadcast the incoming message to all users
        console.debug([clients, 'ciao', event])
        for (const key in clients) {
            clients[key].send('mi hai scritto: ' + event.data);
        }
    };

    connection.on('error', console.error);

    connection.send('something');
});