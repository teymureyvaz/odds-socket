const
    http = require("http"),
    express = require("express"),
    socketio = require("socket.io");

const SERVER_PORT = 3000;

const onlineClients = new Set();


// create a new express app
const app = express();
// create http server and wrap the express app
const server = http.createServer(app);
// bind socket.io to that server
const io = socketio(server);


// will fire for every new websocket connection
io.on("connection", onNewWebsocketConnection);
var connectCounter = 0;

function onNewWebsocketConnection(socket) {
    console.log( socket.client.conn.server.clientsCount + " users connected" );
    console.info(`Socket ${socket.id} has connected.`);
    onlineClients.add(socket.id);
    
    socket.on("disconnect", () => {
        onlineClients.delete(socket.id);
        console.info(`Socket ${socket.id} has disconnected.`);
    });

}


// important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
server.listen(SERVER_PORT, () => console.info(`Listening on port ${SERVER_PORT}.`));

