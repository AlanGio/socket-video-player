// SERVER SIDE

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


io.on('connection', (client) => {
  client.on('commentToShow', (comment) => {
    console.log('comment receiving', comment);
    io.sockets.emit('comment', comment);
  });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);