const startButton = document.getElementById("Start");
const restartButton = document.getElementById("Restart");
const score = document.getElementById("score");

let CurrentIndex = null;
let scoreValue = 0;
let timeValue = 30;
let gameInterval = null;
let timerInterval = null;

function show() {
  const gameContainer = document.getElementById("game-container");
  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.id = i.toString();
    hole.classList.add("hole");

    const mole = document.createElement("div");
    mole.classList.add("mole");
    mole.style.display = "none";

    mole.addEventListener("click", function () {
      scoreValue++;
      score.textContent = "Score: " + scoreValue;
      mole.style.display = "none";
    });

    hole.appendChild(mole);
    gameContainer.appendChild(hole);
  }
}

function randomnumba() {
  if (CurrentIndex !== null) {
    document.getElementById(CurrentIndex).querySelector(".mole").style.display =
      "none";
  }

  const current = Math.floor(Math.random() * 9);
  CurrentIndex = current;
  const currentHole = document.getElementById(current.toString());
  currentHole.querySelector(".mole").style.display = "block";
}

function start() {
  startButton.disabled = true;
  scoreValue = 0;
  score.textContent = "Score: 0";
  document.getElementById("time").textContent = "Time: 30";
  timeValue = 30;

  gameInterval = setInterval(randomnumba, 1000);
  timerInterval = setInterval(timer, 1000);
}

function timer() {
  let timeDisplay = document.getElementById("time");
  timeValue--;

  if (timeValue === 0) {
    clearInterval(gameInterval);
    clearInterval(timerInterval);

    if (CurrentIndex !== null) {
      document
        .getElementById(CurrentIndex)
        .querySelector(".mole").style.display = "none";
      CurrentIndex = null;
    }

    alert("Game Over Bro! Your Score: " + scoreValue);
  }

  timeDisplay.textContent = "Time: " + timeValue;
}

function Restart() {
  clearInterval(gameInterval);
  clearInterval(timerInterval);

  if (CurrentIndex !== null) {
    document.getElementById(CurrentIndex).querySelector(".mole").style.display =
      "none";
    CurrentIndex = null;
  }

  start();
}

window.onload = show;
startButton.addEventListener("click", start);
restartButton.addEventListener("click", Restart);
