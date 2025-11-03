const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const bgMusic = document.getElementById("bgMusic");
const crashSound = document.getElementById("crashSound");
const crashScreen = document.getElementById("crashScreen");
const retryBtn = document.getElementById("retryBtn");

let score = 0;
let speed = 2;
let gameRunning = true;

const scoreDisplay = document.createElement("div");
scoreDisplay.id = "scoreDisplay";
scoreDisplay.textContent = "Score: 0";
document.body.appendChild(scoreDisplay);

document.body.addEventListener("click", () => {
  if (!player.classList.contains("jump")) {
    player.classList.add("jump");
    setTimeout(() => player.classList.remove("jump"), 600);
  }
});

bgMusic.play().catch(() => console.log("autoplay blocked, wait for tap"));

function updateScore() {
  if (gameRunning) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }
}

setInterval(updateScore, 500);

function increaseSpeed() {
  if (gameRunning) {
    speed -= 0.1; // decrease animation duration to speed up
    obstacle.style.animation = `moveObs ${speed}s linear infinite`;
  }
}

setInterval(increaseSpeed, 10000);

function checkCollision() {
  if (!gameRunning) return;

  const playerRect = player.getBoundingClientRect();
  const obsRect = obstacle.getBoundingClientRect();

  if (
    playerRect.left < obsRect.left + obsRect.width &&
    playerRect.left + playerRect.width > obsRect.left &&
    playerRect.bottom > obsRect.top
  ) {
    gameOver();
  }
}

function gameOver() {
  gameRunning = false;
  bgMusic.pause();
  crashSound.play();
  crashScreen.style.display = "flex";
  document.getElementById("gameContainer").style.animationPlayState = "paused";
  obstacle.style.animationPlayState = "paused";
  scoreDisplay.style.display = "none";
}

retryBtn.addEventListener("click", () => {
  location.reload();
});

setInterval(checkCollision, 100);
