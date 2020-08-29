const express = require('express');
const { Socket } = require('dgram');
const app = express();
const http = require('http').createServer(app);


const PORT = process.env.PORT || 3000;
 
 
 

http.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

//Socket

const io = require('socket.io')(http)

io.on('connection', (Socket) => {
    console.log('Connected...');
    Socket.on('message', (msg) => {
        Socket.broadcast.emit('message', msg)
    })


})