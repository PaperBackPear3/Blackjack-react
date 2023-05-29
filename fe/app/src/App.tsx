import useWebSocket, { ReadyState } from 'react-use-websocket';

import './App.css'
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WS_URL = 'ws://127.0.0.1:8080';

function App() {

  //const [socketUrl, setSocketUrl] = useState(WS_URL);
  //const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([])
  //const { sendMessage, lastMessage, readyState } = useWebSocket('');
  // const [ws, setWs] = useState<WebSocket | null>(null);
  // useEffect(() => {
  //   if (lastMessage !== null) {
  //     setMessageHistory((prev) => prev.concat(lastMessage));
  //     console.table(JSON.parse(lastMessage.data));
  //   }
  // }, [lastMessage, setMessageHistory]);
  var wsClient: WebSocket | null = null;

  type LoginResponse = {
    result: string,
    message: string
  }


  async function handleClickLogin() {
    try {
      const { data, status } = await axios.post<LoginResponse>(
        'http://localhost:8080/api/v1/login'
      );

      console.log(JSON.stringify(data, null, 4));

      // 👇️ "response status is: 200"

      console.log('response status is: ', status);
      wsClient = new WebSocket(WS_URL);
      wsClient.onopen = () => {
        console.log('onopen');
        wsClient?.send(JSON.stringify({ 'type': 'login', 'data': data.message }))
      };


      return data;
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



  const handleClickSendMessage = useCallback(() => wsClient!.send('startGame'), []);

  return (
    <>
      <button
        onClick={handleClickLogin}
      //disabled={!wsClient || wsClient.readyState === ReadyState.OPEN}
      >
        Login
      </button>
      <button
        onClick={handleClickSendMessage}
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
