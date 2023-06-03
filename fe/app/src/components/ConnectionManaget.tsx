import React from 'react';
import { clientSocket } from '../websocket/clientSocket';

export function ConnectionManager() {
  function connect() {
    clientSocket.connect();
  }

  function disconnect() {
    clientSocket.disconnect();
  }

  return (
    <>
      <button onClick={connect} disabled={clientSocket.connected}>Connect</button>
      <button onClick={disconnect} disabled={clientSocket.disconnected}>Disconnect</button>
    </>
  );
}