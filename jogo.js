let snake;
let food;
const gridSize = 20;

function setup() {
  createCanvas(400, 400);
  snake = new Snake();
  frameRate(10);
  pickLocationForFood();
}

function draw() {
  background(51);
  snake.update();
  snake.show();
  
  if (snake.eat(food)) {
    pickLocationForFood();
  }
  
  fill(255, 0, 100);
  rect(food.x, food.y, gridSize, gridSize);
}

function pickLocationForFood() {
  const cols = floor(width / gridSize);
  const rows = floor(height / gridSize);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(gridSize);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.changeDirection(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.changeDirection(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    snake.changeDirection(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    snake.changeDirection(-1, 0);
  }
}

class Snake {
  constructor() {
    this.body = [createVector(0, 0)];
    this.xdir = 1;
    this.ydir = 0;
  }
  
  update() {
    const head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir * gridSize;
    head.y += this.ydir * gridSize;
    
    // Verifica se a cobra ultrapassou os limites da borda
    if (head.x < 0) {
      head.x = width - gridSize;
    } else if (head.x >= width) {
      head.x = 0;
    }
    
    if (head.y < 0) {
      head.y = height - gridSize;
    } else if (head.y >= height) {
      head.y = 0;
    }
    
    this.body.push(head);
    
    // Verifica se a cobra colidiu consigo mesma
    for (let i = 0; i < this.body.length - 1; i++) {
      if (head.equals(this.body[i])) {
        this.body.splice(0); // Reinicia o corpo da cobra
      }
    }
  }
  
  show() {
    fill(255);
    for (let i = 0; i < this.body.length; i++) {
      rect(this.body[i].x, this.body[i].y, gridSize, gridSize);
    }
  }
  
  grow() {
    const tail = this.body[0].copy();
    this.body.unshift(tail);
  }
  
  eat(pos) {
    const head = this.body[this.body.length - 1];
    if (head.equals(pos)) {
      this.grow();
      return true;
    }
    return false;
  }
  
  changeDirection(x, y) {
    this.xdir = x;
    this.ydir = y;
  }
}