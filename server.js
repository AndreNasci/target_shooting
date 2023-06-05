const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(__dirname));

let x = Math.random() * 450 + "px";
let y = Math.random() * 450 + "px";

// o método 'on' ouve esse evento
// connection dispara sempre que um jogador se conecta
io.on('connection', (socket) => {
    console.log('Um jogador se conectou');

    // emite 
    socket.emit('game', x, y);

    // listener
    socket.on('move', () => {
        io.emit('remove_target');
        x = Math.random() * 450 + "px";
        y = Math.random() * 450 + "px";
        io.emit('game', x, y);
      });


  
    // disconnect é um evento
    // o método 'on' ouve esse evento
    // sempre que um cliente de desconecta do servidor ele é emtiido
    socket.on('disconnect', () => {
        console.log('Um jogador se desconectou');
    });
});

http.listen(3000, () => {
console.log('listening on *:3000');
});
  