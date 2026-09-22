let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("Audio/food.mp3");
const gameOverSound = new Audio("Audio/gameover.mp3");
const moveSound = new Audio("Audio/move.mp3");
const wrongBtnSound = new Audio("Audio/WARN.WAV");
let touchup = document.getElementById("up");
let touchdown = document.getElementById("down");
let touchleft = document.getElementById("left");
let touchright = document.getElementById("right");
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let btnPopup = document.getElementById("wrongbtn");
let gameOverPopup = document.getElementById("gameover");
let settings = document.getElementById("settings");
let closeSettings = document.getElementById("closeSettings");
let openSettings = document.getElementById("openSettings");
let food = { x: 6, y: 7 };

let snakeSpeed = document.getElementById("snakeSpeed");
let snakeColor = document.getElementById("snakeColor");
let snakeFood = document.getElementById("snakeFood");
let selectedSpeed = "10";
let selectedFood = "🍎";
let selectedColor = "red";
setInterval(() => {
  if (selectedColor == "" || selectedFood == "" || selectedSpeed == "") {
    selectedSpeed = "10";
    selectedFood = "🍎";
    selectedColor = "red";
  }
  snakeSpeed.addEventListener("change", () => {
    selectedSpeed = snakeSpeed.value;
  });
  snakeColor.addEventListener("change", () => {
    selectedColor = snakeColor.value.toLowerCase();
  });
  snakeFood.addEventListener("change", () => {
    selectedFood = snakeFood.value;
  });
}, 1000);

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / selectedSpeed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    inputDir = { x: 0, y: 0 };
    gameOverPopup.classList.toggle("gameover");
    setTimeout(() => {
      gameOverPopup.classList.remove("gameover");
    }, 1000);
    snakeArr = [{ x: 13, y: 15 }];
    score = 0;
  }

  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.style.backgroundColor = selectedColor;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  foodElement = document.createElement("div");
  foodElement.innerHTML = selectedFood;
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      moveSound.play();
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      moveSound.play();
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      moveSound.play();
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      moveSound.play();
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
touchup.addEventListener("click", (e) => {
  moveSound.play();
  inputDir.x = 0;
  inputDir.y = -1;
});
touchdown.addEventListener("click", (e) => {
  moveSound.play();
  inputDir.x = 0;
  inputDir.y = 1;
});
touchleft.addEventListener("click", (e) => {
  moveSound.play();
  inputDir.x = -1;
  inputDir.y = 0;
});
touchright.addEventListener("click", (e) => {
  moveSound.play();
  inputDir.x = 1;
  inputDir.y = 0;
});
openSettings.addEventListener("click", () => {
  settings.style.scale = "100%";
});
closeSettings.addEventListener("click", () => {
  settings.style.scale = "0%";
});
