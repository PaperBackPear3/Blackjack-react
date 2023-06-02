import './App.css'
import { useCallback, useRef } from 'react';
import axios from 'axios';

const WS_URL = 'ws://127.0.0.1:8080';

function App() {

  const wsClient = useRef<WebSocket | null>(null);


  async function handleClickLogin() {
    try {
      wsClient.current = new WebSocket(WS_URL);
      wsClient.current.onopen = () => {
        console.log('onopen');
        wsClient.current?.send(JSON.stringify({ 'type': 'login' }))
      };
      wsClient.current.addEventListener('message', function (event) {
        console.log(event.data);
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



  const handleClickSendMessage = useCallback(() => wsClient.current?.send('joinRoom'), []);

  return (
    <>
      <button
        onClick={handleClickLogin}
      //disabled={!wsClient || wsClient.readyState === ReadyState.OPEN}
      >
        Connect
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
