// CLIENT SIDE
import openSocket from 'socket.io-client';

const socket = openSocket(process.env.REACT_APP_URL_SERVER);

const subscribeToComment = (cb) => {
  socket.on('comment', (comment) => cb(null, comment));
};

const subscribeToNote = (cb) => {
  socket.on('note', (note) => cb(null, note));
};

export { subscribeToComment, subscribeToNote };
