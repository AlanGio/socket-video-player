// CLIENT SIDE

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');

const subscribeToTimer = (cb) => {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

const subscribeToText = (cb) => {
  socket.on('text', text => cb(null, text));
}

export { subscribeToTimer, subscribeToText };