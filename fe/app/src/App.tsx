import './App.css'
import { useEffect, useState } from 'react';
import { clientSocket } from './websocket/clientSocket';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManaget';
import { ConnectionState } from './components/ConnectionStatus/ConnectionStatus';
import { toast } from 'react-toastify';
import { RoomsManager } from './components/RoomsManager/RoomsManager';
import { ToastComponentContainer } from './components/Toast';
import { MessageData } from './common/types/socketIoTypes';
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

    function onRoomEvent(roomEvent: MessageData) {
      toast(roomEvent.message, { type: roomEvent.success ? 'success' : 'error' });
    }

    clientSocket.on('connect', onConnect,);
    clientSocket.on('disconnect', onDisconnect);

    clientSocket.on('clientRoomId', (roomId: string) => {
      setRoomId(roomId);
    });
    clientSocket.on('roomEvent', onRoomEvent);


    return () => {
      clientSocket.off('connect', onConnect);
      clientSocket.off('disconnect', onDisconnect);
      clientSocket.off('clientRoomId');
      clientSocket.off('roomEvent', onRoomEvent);

    };
  }, []);


  function handleClickJoinRoom() {
    if (!friendRoomId || friendRoomId.length === 0) {
      toast.error("insert RoomID");
      return;
    }
    clientSocket.emit('joinRoom', { roomId: friendRoomId, userId: userId }, (response) => {
      if (response.success) {
        setRoomId(response.data);
      }
      toast(response.message, { type: response.success ? 'success' : 'error' });
    });
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
