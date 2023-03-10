// Importing the required modules
const WebSocketServer = require('ws');
 
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: 8080 })
 
// Creating connection using websocket
wss.on("connection", ws => {
 
    ws.on("message", data => {
         odds = JSON.parse(data);
         if(odds.hasOwnProperty('code')){
            if (odds.code == "456789kjbvGVHUJ") {
                 wss.clients.forEach(function each(client){
                 console.log("sent to client")
                 client.send(data.toString());
               });
            } 
         }
     
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("the client has connected");
    });
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");
