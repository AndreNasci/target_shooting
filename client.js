// cria conexão com servidor usando objeto io
const socket = io();



// score do jogador
let score = 0;
let flag = 0;
let targets = []
let n_targets;

// listener 
// 'game' é emitido ao inicio do jogo
// e sempre que um jogador clica em um target
socket.on('game', (x, y, n, p1, p2) => {
    
    // Define numero de targets
    n_targets = n;


    function createTarget() {
   
        // cria div para cada target
        // adiciona classe 'target' ao elemento
        // define posicao
        for (var i=0; i<n_targets; i++) {
            targets[i] = document.createElement("div");
            targets[i].classList.add("target");
            targets[i].style.top = y[i];
            targets[i].style.left = x[i];
        }

        document.getElementById("p1").textContent = p1;
        document.getElementById("p2").textContent = p2;

        // adiciona listeners aos targets
        for(var i=0; i<n_targets; i++) {
            targets[i].addEventListener("click", function() {
                score++;
                document.getElementById("score").textContent = score;
                socket.emit('move');
            });
        }

        // remove target do jogo
        socket.on('remove_target', () => {
            for (var i=0; i<n_targets; i++) {
                targets[i].remove();
            }
        });


        for (var i=0; i<n_targets; i++) {
            document.getElementById("game").appendChild(targets[i]);
        }
    }

    createTarget();

    socket.on('win', () => {
        document.getElementById("p1").textContent = 100;
        document.getElementById("p2").textContent = 0;
    });

    socket.on('lose', () => {
        document.getElementById("p1").textContent = 0;
        document.getElementById("p2").textContent = 100;
    });

});