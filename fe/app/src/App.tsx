import useWebSocket, { ReadyState } from 'react-use-websocket';

import './App.css'
import { useState, useEffect, useCallback } from 'react';

const WS_URL = 'ws://127.0.0.1:8080';

function App() {

  const [socketUrl, setSocketUrl] = useState(WS_URL);
  const [messageHistory, setMessageHistory] = useState<MessageEvent[]>([])
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);


  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));
      console.log(lastMessage.data);
    }
  }, [lastMessage, setMessageHistory]);

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];


  // if (readyState) {
  //   sendMessage('Hello!');
  //   console.log('readyState' + lastMessage);
  // }


  return (
    <>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      <span>Socket URL: {socketUrl}</span>
      <br />
      <br />
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <br></br>
      <span>whole history </span>
      <br></br>
      <ul>
        {messageHistory.map((message, idx) => (
          <span key={idx}>{message ? message['data'] : null}</span>
        ))}
      </ul>
    </>
  );
}

export default App
