// CLIENT SIDE

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:8000');

const subscribeToComment = (cb) => {
  socket.on('comment', (comment) => cb(null, comment));
};

export default subscribeToComment;
