const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 8080;


function onConnection(socket){
  socket.on('message', (msg) => {
   io.broadcast(msg)
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
