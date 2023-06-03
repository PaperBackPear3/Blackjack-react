import './App.css'
import { useEffect, useState } from 'react';
import { clientSocket } from './websocket/clientSocket';
import { ConnectionManager } from './components/ConnectionManaget';
import { ConnectionState } from './components/ConnectionStatus';
function App() {


  const [userId, setUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(clientSocket.connected);

  useEffect(() => {
    function onConnect() {
      setUserId(clientSocket.id);
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    clientSocket.on('connect', onConnect);
    clientSocket.on('disconnect', onDisconnect);

    return () => {
      clientSocket.off('connect', onConnect);
      clientSocket.off('disconnect', onDisconnect);
    };
  }, []);


  function handleClickJoinRoom() {
    console.log(roomId, userId, clientSocket)
    clientSocket.emit('joinRoom', { roomId: roomId, userId: userId })
    //(answer) => {
    // });
  }

  return (
    <>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <br></br>
      <input type='text' placeholder='roomId' value={roomId} onChange={e => setRoomId(e.target.value)} />
      <button
        onClick={handleClickJoinRoom}
      >
        Join Room
      </button>
    </>
  );
}

export default App
