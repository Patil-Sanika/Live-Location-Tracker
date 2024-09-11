const express = require('express');
const app = express();
const path = require('path');
const http = require("http");

const socketio = require("socket.io");
const { disconnect } = require('process');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{id:socket.id,...data});
    });
    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id);
    });
});

app.get("/", function(req, res){
    res.render("index.ejs");
});

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});
