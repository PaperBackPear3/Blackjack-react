import './App.css'
import { useEffect, useState } from 'react';
import { clientSocket } from './websocket/clientSocket';
import { ConnectionManager } from './components/ConnectionManaget';
import { ConnectionState } from './components/ConnectionStatus';
import { toast } from 'react-toastify';
import { RoomsManager } from './components/RoomsManager';
import { ToastComponentContainer } from './components/Toast';
function App() {


  const [userId, setUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [friendRoomId, setFrinedRoomId] = useState<string>('');
  const [isConnected, setIsConnected] = useState(clientSocket.connected);

  useEffect(() => {
    function onConnect() {
      setUserId(clientSocket.id);
      setIsConnected(true);
      console.log('connected use effect ', clientSocket)
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    clientSocket.on('connect', onConnect,);
    clientSocket.on('disconnect', onDisconnect);
    clientSocket.on('clientRoomId', (roomId: string) => {
      setRoomId(roomId);
    });



    return () => {
      clientSocket.off('connect', onConnect);
      clientSocket.off('disconnect', onDisconnect);
    };
  }, []);


  function handleClickJoinRoom() {
    if (!friendRoomId || friendRoomId.length === 0) {
      toast.error("insert RoomID");
      return;
    }
    console.log(roomId,friendRoomId ,userId, clientSocket)
    clientSocket.emit('joinRoom', { roomId: friendRoomId, userId: userId })
  }

  return (
    <>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <br></br>
      <RoomsManager currentRoomId={roomId} setFrinedRoomId={setFrinedRoomId} isConnected={isConnected} handleClickJoinRoom={handleClickJoinRoom} />
      <ToastComponentContainer />
    </>
  );
}

export default App
