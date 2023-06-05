// cria conexão com servidor usando objeto io
const socket = io();







// score do jogador
let score = 0;

// listener 
socket.on('game', (x, y) => {

    function createTarget() {
        //cria div para cada target
        let target = document.createElement("div");
        // adiciona classe target ao elemento
        target.classList.add("target");

        // define posicao
        target.style.top = y;
        target.style.left = x;
        

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