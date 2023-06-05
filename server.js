const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);

app.use(express.static(__dirname));


let player_count = 0;
// jogador atual
let currentPlayer = 1;
// scores dos jogadores
let score_P1 = 50;
let score_P2 = 50;
let players = {}

let x = Math.random() * 450 + "px";
let y = Math.random() * 450 + "px";

// o método 'on' ouve esse evento
// connection dispara sempre que um jogador se conecta
io.on('connection', (socket) => {
    console.log('Um jogador se conectou', currentPlayer);

    // usa id do socket como chave para o jogador
    players[socket.id] = currentPlayer;
    //player_count++;

    // operador ternario (alterna simbolos)
    // proximo player que se conectar terá outro simbolo
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // emite coordenadas
    socket.emit('game', x, y, 50, 50);

    // listener
    socket.on('move', () => {
        console.log(currentPlayer);
        console.log(players[socket.id]);


        io.emit('remove_target');
        x = Math.random() * 450 + "px";
        y = Math.random() * 450 + "px";
        
        // atualiza scores
        if (players[socket.id] == 1) {
            score_P1++;
            score_P2--;
        }
        else if (players[socket.id] == 2) {
            score_P1--;
            score_P2++;
        }
        io.emit('game', x, y, score_P1, score_P2);
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
  