// SERVER SIDE

const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});


io.on('connection', (client) => {

  client.on('subscribeToTimer', (interval) => {
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });

  client.on('textToShow', (text) => {
    console.log('textVideo receiving', text);
    io.sockets.emit('text', text);
  });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);