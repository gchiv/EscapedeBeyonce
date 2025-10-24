const player = document.getElementById('player');
const beyonce = document.getElementById('beyonce')
const gameArea = document.getElementById('game-area');

const playerSpeedInput = document.getElementById('player-speed');
const beyonceSpeedInput = document.getElementById('beyonce-speed');
const bgColorInput = document.getElementById('background-color');

let playerPosition = {x: 100, y: 100};
let beyoncePosition = {x: 300, y: 300};


let playerSpeed = Number(playerSpeedInput.value);
let beyonceSpeed = Number(beyonceSpeedInput.value);

playerSpeedInput.addEventListener('input', (event) => {
    playerSpeed = Number(event.target.value);
});

beyonceSpeedInput.addEventListener('input', (event) => {
    beyonceSpeed = Number(event.target.value);
});

bgColorInput.addEventListener('input', (event) => {
    gameArea.style.backgroundColor = event.target.value;
});

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            playerPosition.y -= playerSpeed;
            break;
        case 'ArrowDown':
            playerPosition.y += playerSpeed;
            break  
        case 'ArrowLeft':
            playerPosition.x -= playerSpeed;
            break;
        case 'ArrowRight':
            playerPosition.x += playerSpeed;
            break;
    }
    updatePositions();

});



function moveBeyonce(){

    if(beyoncePosition.y < playerPosition.x){
        beyoncePosition.x += beyonceSpeed;
    } else if(beyoncePosition.x > playerPosition.x){
        beyoncePosition.x -= beyonceSpeed;
    }

    if(beyoncePosition.y < playerPosition.y){
        beyoncePosition.y += beyonceSpeed;
    } else if(beyoncePosition.y > playerPosition.y){
        beyoncePosition.y -= beyonceSpeed;
    }

    updatePositions();
    checkCollision();

}

function updatePositions(){

    const minLimit = 0;
    const maxLimit = 450; 

    playerPosition.x = Math.max(minLimit, Math.min(maxLimit, playerPosition.x));
    playerPosition.y = Math.max(minLimit, Math.min(maxLimit, playerPosition.y));

    beyoncePosition.x = Math.max(minLimit, Math.min(maxLimit, beyoncePosition.x));
    beyoncePosition.y = Math.max(minLimit, Math.min(maxLimit, beyoncePosition.y));
    
    player.style.transform = 'translate(' + playerPosition.x + 'px, ' + playerPosition.y + 'px)';
    beyonce.style.transform = 'translate(' + beyoncePosition.x + 'px, ' + beyoncePosition.y + 'px)'

}

function checkCollision(){
    if(Math.abs(playerPosition.x - beyoncePosition.x) < 50 &&
    Math.abs(playerPosition.y - beyoncePosition.y) < 50){ 
        
        alert('Perdiste, Beyonce te Atrapo!!!');

        playerPosition = {x: 100, y: 100};
        beyoncePosition = {x: 300, y: 300};
        
        updatePositions(); 
    }
}
function gameLoop(){
    moveBeyonce();
    updatePositions();
    requestAnimationFrame(gameLoop);
}

gameLoop();