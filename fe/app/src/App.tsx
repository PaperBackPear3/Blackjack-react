import './App.css'
import { useEffect, useState } from 'react';
import { clientSocket } from './websocket/clientSocket';
import { ConnectionManager } from './components/ConnectionManager/ConnectionManaget';
import { ConnectionState } from './components/ConnectionStatus/ConnectionStatus';
import { toast } from 'react-toastify';

import { ToastComponentContainer } from './components/Toast';
import { Card } from 'card-games-types/cards'
import { MessageData } from 'card-games-types/message';
import StartGame from './components/StartGame/StartGame';
import RoomsManager from './components/RoomsManager/RoomsManager';

function App() {


  const [userId, setUserId] = useState<string>('');
  const [roomId, setRoomId] = useState<string>('');
  const [friendRoomId, setFrinedRoomId] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(clientSocket.connected);
  const [bettedvalue, setBettedValue] = useState<number>(0);
  const [lastBet, setLastBet] = useState<number>(0);
  const [skipped, setSkipped] = useState<boolean>(false);
  const [isplaying, setIsPlaying] = useState<boolean>(false);
  const [cardsInHand, setCardsInHand] = useState<Card[]>([]);


  useEffect(() => {
    function onConnect() {
      setUserId(clientSocket.id);
      setIsConnected(true);
      console.log('connected use effect ', clientSocket)
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onUpdatePlayerCardsEvent(data: Card[]) {
      console.log('updatePlayerCardsEvent', data);
      setCardsInHand(data);
    }

    clientSocket.on('connect', onConnect,);
    clientSocket.on('disconnect', onDisconnect);

    clientSocket.on('clientRoomId', (roomId: string) => {
      setRoomId(roomId);
    });
    clientSocket.on('updatePlayerCardsEvent', onUpdatePlayerCardsEvent);

    return () => {

      clientSocket.off('connect', onConnect);
      clientSocket.off('disconnect', onDisconnect);
      clientSocket.off('clientRoomId');
      clientSocket.off('updatePlayerCardsEvent', onUpdatePlayerCardsEvent);
    };
  }, []);


  function handleClickJoinRoom() {
    if (!friendRoomId || friendRoomId.length === 0) {
      toast.error("insert RoomID");
      return;
    }
    clientSocket.emit('joinRoom', { roomId: friendRoomId, userId: userId, message: {} as MessageData }, (response) => {
      if (response.success && response.data) {
        setRoomId(response.data);
      }
      toast(response.message, { type: response.success ? 'success' : 'error' });
    });
  }


  function handleClickStartGame() {
    clientSocket.emit('startGame', { roomId: roomId, userId: userId, message: {} as MessageData })
  }

  function bet() {
    clientSocket.emit('bet', { playerId: userId, amount: bettedvalue }, (response) => {
      if (response.success && response.data) {

        setBettedValue(parseInt(response.data));
      }
      toast(response.message, { type: response.success ? 'success' : 'error' });
    })

  }

  return (
    <>
      <div className='header'>
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
      </div>
      <div className='body'>
        <RoomsManager currentRoomId={roomId} setFrinedRoomId={setFrinedRoomId} isConnected={isConnected} handleClickJoinRoom={handleClickJoinRoom} handleClickStartGame={handleClickStartGame} />
        <StartGame onClickStartGame={handleClickStartGame} isDisabled={!isConnected} />
        <div className='cards-container'>
          {cardsInHand.map((card) => {
            return (
              <div className='card'>
                <p>{card.value}</p>
                <p>{card.altText}</p>
                <img src={card.image} alt={card.altText} />
              </div>
            )
          }
          )}
        </div>
        <div className='action-container'>
          <button onClick={bet}>Bet</button>
          <button onClick={() => { setSkipped(!skipped) }}>Skip</button>
        </div>
      </div>
      <ToastComponentContainer />
    </>
  );
}

export default App
