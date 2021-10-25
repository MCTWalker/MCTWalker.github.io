var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var grid = 16;
var snake = {
  x: 160,
  y: 160,
  dx: grid, //dx is the horizontal direction the snake is moving. Negative moves left, positive moves right
  dy: 0, //dy is the vertical direction the snake is moving. Negative moves up, positive moves down.
  cells: [],
  maxCells: 4
};
var count = 0;
var apple = {
  x: 320,
  y: 320
};
var keyMap = {
	37: {dx : -grid, dy: 0}, //left arrow
	38: {dx : 0, dy : -grid}, //up arrow
	39: {dx : grid, dy : 0}, //right arrow
	40: {dx : 0, dy : grid}	//down arrow
}
var img = new Image();
img.height = grid;
img.width = grid;
img.src = "apple.svg";
var score = 0;
var directionQueue = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function resetGame(){
	snake.x = 160;
	snake.y = 160;
	snake.cells = [];
	snake.maxCells = 4;
	snake.dx = grid;
	snake.dy = 0;
	apple.x = getRandomInt(0, 25) * grid;
	apple.y = getRandomInt(0, 25) * grid;
	score = 0;
}

function canSwitchDirection(e){
	if (
    (e.which === 37 && snake.dx === 0) || //if the key pressed is the left arrow and the snake is moving vertically
    (e.which === 38 && snake.dy === 0) || //if the key pressed is the up arrow and the snake is moving horizontally
    (e.which === 39 && snake.dx === 0) || //if the key pressed is the right arrow and the snake is moving vertically
    (e.which === 40 && snake.dy === 0)) //if the key pressed is the down arrow and the snake is moving horizontally
  {
		return true;
	}
	return false;
}

function handleArrowKey(e){
  // prevent snake from backtracking on itself
	if (canSwitchDirection(e)){
		directionQueue.push(keyMap[e.which])
	}
}

function handleWallHit() {
  let wallHit = false;
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
    wallHit = true;
  }
  else if (snake.x >= canvas.width) {
    snake.x = 0;
    wallHit = true;
  }
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
    wallHit = true;
  }
  else if (snake.y >= canvas.height) {
    snake.y = 0;
    wallHit = true;
  }

  return wallHit;
}

function drawSnake() {
  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.beginPath();
    context.arc(cell.x + grid/2, cell.y + grid/2, grid/2,0,2*Math.PI);
    context.fill();
    // snake ate apple
    if (cell.x === apple.x && cell.y === apple.y) {
      score++;
      snake.maxCells++;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }
    // check collision with all cells after this one (modified bubble sort)
    for (var i = index + 1; i < snake.cells.length; i++) {
      // collision. reset game
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        resetGame();
      }
    }
  });
}

// game loop
function loop() {
  requestAnimationFrame(loop);
  // slow game loop to 15 fps instead of 60 - 60/15 = 4
  if (++count < 8) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  if (directionQueue.length){
    var directionObj = directionQueue.shift();
    snake.dx = directionObj.dx;
    snake.dy = directionObj.dy;
  }
  snake.x += snake.dx;
  snake.y += snake.dy;
  let wallHit = handleWallHit();
  // keep track of where snake has been. front of the array is always the head
  snake.cells.unshift({x: snake.x, y: snake.y});//add a snake cell to the front
  //remove last snake cell to make it look like snake has moved
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  if (wallHit) {
    resetGame();
  }
  // draw apple
  context.drawImage(img, apple.x, apple.y, grid, grid);
  
  drawSnake();
 
  context.font="20px Arial"
  context.fillStyle = 'white';
  context.fillText(score, 30, 30);
}

document.addEventListener('keydown', function(e) {
	handleArrowKey(e);
});

requestAnimationFrame(loop);