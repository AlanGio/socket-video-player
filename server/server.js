// SERVER SIDE

const httpServer = require("http").createServer();
const notes = [];

const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (client) => {

  io.sockets.emit('note', notes);

  client.on('commentToShow', (comment) => {
    console.log('comment receiving', comment);
    io.sockets.emit('comment', comment);
  });

  client.on('noteToShow', (note) => {
    console.log('note receiving', note);
    notes.push(note);
    console.log('notes sent', notes);
    io.sockets.emit('note', notes);
  });
  
});

const port = process.env.PORT || 8000;
io.listen(port);
console.log('listening on port ', port);