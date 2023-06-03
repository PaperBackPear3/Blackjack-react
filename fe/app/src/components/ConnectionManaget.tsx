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
      <button onClick={ connect }>Connect</button>
      <button onClick={ disconnect }>Disconnect</button>
    </>
  );
}