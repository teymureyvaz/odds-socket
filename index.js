const express = require('express');
const app = express();
const http = require('https').Server(app);
const io = require('socket.io')(http);
const port = (process.env.PORT || 5000)

function onConnection(socket){
  socket.on('message', (msg) => {
    io.emit('chat message', msg);
  });
}

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
