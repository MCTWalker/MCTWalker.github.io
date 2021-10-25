let canvas = document.getElementById('game');
let context = canvas.getContext('2d');
let grid = 16;
let snake = {
  x: 160,
  y: 160,
  dx: grid, //dx is the horizontal direction the snake is moving. Negative moves left, positive moves right
  dy: 0, //dy is the vertical direction the snake is moving. Negative moves up, positive moves down.
  cells: [],
  maxCells: 4
};
let count = 0;
let apple = {
  x: 320,
  y: 320
};
let keyMap = {
	37: {dx : -grid, dy: 0}, //left arrow
	38: {dx : 0, dy : -grid}, //up arrow
	39: {dx : grid, dy : 0}, //right arrow
	40: {dx : 0, dy : grid}	//down arrow
}
let img = new Image();
img.height = grid;
img.width = grid;
img.src = "apple.svg";
let score = 0;
let directionQueue = [];

function getRandomInt(min, max) {
  //add your code here
}

function resetGame(){
  //add your code here
}


function handleArrowKey(e){
  // add your code here
}

function handleWallHit() {
  //add your code here
}

snake.canSwitchDirection = function(e) {
  //add your code here
}

snake.move = function() {
  //add your code here
}

snake.handleDirectionChange = function() {
  //add your code here
}

snake.draw = function() {
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
    for (let i = index + 1; i < snake.cells.length; i++) {
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
  if (++count < 4) {
    return;
  }
  count = 0;
  context.clearRect(0,0,canvas.width,canvas.height);
  if (directionQueue.length){
    snake.handleDirectionChange();
  }

  snake.move();
  handleWallHit();

  // draw apple
  context.drawImage(img, apple.x, apple.y, grid, grid);
  
  snake.draw();
 
  context.font="20px Arial"
  context.fillStyle = 'white';
  context.fillText(score, 30, 30);
}

document.addEventListener('keydown', function(e) {
	handleArrowKey(e);
});

requestAnimationFrame(loop);