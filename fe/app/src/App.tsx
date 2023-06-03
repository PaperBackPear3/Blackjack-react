import './App.css'
import { useCallback, useRef } from 'react';
import axios from 'axios';
import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from './common/types/socketIoTypes';

const WS_URL = 'ws://127.0.0.1:8080';

function App() {

  let wsClient: Socket<ServerToClientEvents, ClientToServerEvents> = io();


  function handleClickLogin() {
    try {
      wsClient = io(WS_URL)
      wsClient.on("connect", () => {
        console.log(wsClient.id);
      });

      wsClient.on("disconnect", () => {
        console.log(wsClient.id); // undefined

      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
  }

  function handleClickClose() {
    wsClient.emit('joinRoom')
    wsClient.disconnect()
  }


  //const handleClickSendMessage = useCallback(() => wsClient.send('joinRoom'), []);

  return (
    <>
      <button
        onClick={handleClickLogin}
      //disabled={!wsClient || wsClient.readyState === ReadyState.OPEN}
      >
        Connect
      </button>
      <br></br>
      <button
        onClick={handleClickClose}
      //disabled={!wsClient || wsClient.readyState === ReadyState.OPEN}
      >
        Close
      </button>
      <br></br>
      <button
      //onClick={ /*handleClickSendMessage}
      //  disabled={wsClient!.readyState !== ReadyState.OPEN}
      >
        Click Me to get the deck
      </button>
      <br></br>
      {/* <span>The WebSocket is currently {(wsClient != null && wsClient.readyState) === ReadyState.OPEN ? 'open' : 'closed'}</span> */}
      <span>Socket URL: {WS_URL}</span>
      <span>whole history </span>
      <br></br>
      {/* <ul> //TODO redo this with new socket
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message['data'] : null}</span>
        ))}
      </ul> */}
    </>
  );
}

export default App
