var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 3000 }); // ws://localhost:3000

// Static test var
var test_message = {
    'test': 'Response',
    'test2': 'Response2'
};

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    console.log('IT IS GETTING INSIDE CLIENTS');
    console.log(client);

    // The data is coming in correctly
    console.log(data);
    client.send(data);
  });
};

wss.on('connection', function(ws) {
   ws.on('message', function(message) {
     wss.broadcast(test_message);
     console.log('Received: ' + message);
   });

   // TODO This is static just to check that the connection is properly working
   ws.send('You successfully connected to the websocket.');
});
