const canvas = document.getElementById("game");
let game;
let isPaused = false;

document.getElementById("startBtn").addEventListener('click', startGame);
document.getElementById("pauseBtn").addEventListener('click', togglePause);
document.getElementById("restartBtn"),addEventListener('click', restartGame);

//Create the game board
const ctx = canvas.getContext("2d");

//represent the game board on the canvas
const box = 20;
let snake = [{ x: 200, y: 200}];
let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if(event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if(event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if(event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if(event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

console.log("passed change direction");

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "lime" : "green";
        ctx.fillRect(part.x, part.y, box, box);
    });

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction === "UP") headY -= box;
    if(direction === "DOWN") headY += box;
    if(direction === "LEFT") headX -= box;
    if(direction === "RIGHT") headX += box;

    //Game over check

    if (
        headX < 0 ||
        headY < 0 ||
        headX >= canvas.width ||
        headY >= canvas.height ||
        collision({ x: headX, y: headY}, snake)
    ) {
        clearInterval(game);
        alert("Game Over!");
        return;
    }

    //eat food 
    if (headX === food.x && headY === food.y) {
        food = {
            X: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    const newHead = { x: headX, y: headY };
    snake.unshift(newHead);  
}

function collision(head, body) {
    return body.some(segment => segment.x === head.x && segment.y === head.y);
}

function togglePause() {
    if(!game) return;

    if (isPaused) {
        game = setInterval(drawGame, 150);
        isPaused = false;
    } else {
        clearInterval(game);
        game = null;
        isPaused = true;
    }
}

function restartGame() {
    clearInterval(game);
    game = null;

    snake = [{ x: 200, y: 200}];
    direction = "RIGHT";
    isPaused = false;

    food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    startGame();
}

function startGame() {
    if (!game) {
        game = setInterval(drawGame, 150);
    }
}

