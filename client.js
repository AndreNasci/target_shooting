// cria conexão com servidor usando objeto io
const socket = io();







// score do jogador
let score = 0;

// listener 
// 'game' é emitido ao inicio do jogo
// e sempre que um jogador clica em um target
socket.on('game', (x, y, p1, p2) => {

    function createTarget() {
        //cria div para cada target
        let target = document.createElement("div");
        // adiciona classe target ao elemento
        target.classList.add("target");

        // define posicao
        target.style.top = y;
        target.style.left = x;
        document.getElementById("p1").textContent = p1;
        document.getElementById("p2").textContent = p2;

        target.addEventListener("click", function() {
            score++;
            document.getElementById("score").textContent = score;
            socket.emit('move');
        });
        
        socket.on('remove_target', () => {
            target.remove();
        });

        document.getElementById("game").appendChild(target);
    }

    createTarget();

});