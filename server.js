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
let p_sockets = []

let n_targets = 3;
let x = [];
let y = [];

// define posicao aleatoria dos targets
function target_position() {
    for (var i=0; i<n_targets; i++) {
        x[i] = Math.random() * 450 + "px";
        y[i] = Math.random() * 450 + "px";
    }
}
target_position();



// o método 'on' ouve esse evento
// connection dispara sempre que um jogador se conecta
io.on('connection', (socket) => {
    console.log('Um jogador se conectou', currentPlayer);

    // usa id do socket como chave para o jogador
    players[socket.id] = currentPlayer;
    p_sockets[currentPlayer] = socket;


    // operador ternario (alterna simbolos)
    // proximo player que se conectar terá outro simbolo
    currentPlayer = currentPlayer === 1 ? 2 : 1;

    // emite coordenadas
    socket.emit('game', x, y, n_targets, 50, 50);

    // listener
    socket.on('move', () => {
        console.log(currentPlayer);
        console.log(players[socket.id]);

        // atualiza posicoes dos targets
        io.emit('remove_target');
        target_position();
        
        // atualiza scores
        if (players[socket.id] == 1) {
            score_P1++;
            score_P2--;
        }
        else if (players[socket.id] == 2) {
            score_P1--;
            score_P2++;
        }

        if (score_P1 == 70 || score_P2 == 70) {
            p_sockets[1].emit('win');
            p_sockets[2].emit('lose');
        }
        else {
            io.emit('game', x, y, n_targets, score_P1, score_P2);
        }
      });


  
    // disconnect é um evento
    // o método 'on' ouve esse evento
    // sempre que um cliente de desconecta do servidor ele é emtiido
    socket.on('disconnect', () => {
        console.log('Um jogador se desconectou');
    });
});

http.listen(3001, () => {
console.log('listening on *:3000');
});
  