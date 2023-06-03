import './App.css'
import { useEffect, useState } from 'react';
import { clientSocket } from './websocket/clientSocket';
import { ConnectionManager } from './components/ConnectionManaget';
import { ConnectionState } from './components/ConnectionStatus';
import { ToastContainer, toast } from 'react-toastify';
import { RoomsManager } from './components/RoomsManager';
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
    if (!roomId || roomId.length === 0) {
      toast.error("insert RoomID");
      return;
    }
    console.log(roomId, userId, clientSocket)
    clientSocket.emit('joinRoom', { roomId: roomId, userId: userId })
  }

  return (
    <>
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <br></br>
      <RoomsManager roomId={roomId} setRoomId={setRoomId} isConnected={isConnected} handleClickJoinRoom={handleClickJoinRoom} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App
