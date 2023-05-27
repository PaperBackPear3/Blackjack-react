import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080/', {
  perMessageDeflate: false
});