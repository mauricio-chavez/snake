class Snake {
  size = 0
  squares = []
  currentDirection = 'LEFT'
  DIRECTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN'
  }

  constructor(canvas) {
    this.borderWidth = canvas.width
    this.borderHeight = canvas.height
    this.ctx = canvas.getContext('2d')
    this.ctx.fillStyle = 'rgb(124,252,0)'
  }

  start() {
    const startingX = Math.floor(this.borderWidth / 2)
    const startingY = Math.floor(this.borderHeight / 2)

    this.drawSquare(startingX, startingY)
    this.squares.push([startingX, startingY])
    this.size++

    document.onkeydown = e => {
      switch (e.keyCode) {
        case 38:
          this.currentDirection = 'UP'
          break
        case 40:
          this.currentDirection = 'DOWN'
          break
        case 37:
          this.currentDirection = 'LEFT'
          break
        case 39:
          this.currentDirection = 'RIGHT'
          break
      }
    }

    this.interval = setInterval(() => {
      this.move(this.currentDirection)
    }, 600)
  }

  stop() {
    clearInterval(this.interval)
    for (let i = 0; i < this.squares.length; i++) {
      this.clearSquare(this.squares[i][0], this.squares[i][1])
    }
    this.size = 0
    this.squares = []
    this.currentDirection = 'LEFT'
  }

  drawSquare(x, y) {
    this.ctx.fillRect(x, y, 10, 10)
  }

  clearSquare(x, y) {
    this.ctx.clearRect(x, y, 10, 10)
  }

  collides(x, y) {
    return x >= 0 &&
      x <= this.borderWidth - 10 &&
      y >= 0 &&
      y <= this.borderHeight - 10
      ? false
      : true
  }

  move(direction) {
    let newSquare
    let x = this.squares[0][0]
    let y = this.squares[0][1]
    switch (direction) {
      case this.DIRECTIONS.UP:
        newSquare = [x, y - 10]
        break
      case this.DIRECTIONS.DOWN:
        newSquare = [x, y + 10]
        break
      case this.DIRECTIONS.LEFT:
        newSquare = [x - 10, y]
        break
      case this.DIRECTIONS.RIGHT:
        newSquare = [x + 10, y]
        break
    }
    if (!this.collides(newSquare[0], newSquare[1])) {
      this.clearSquare(...this.squares.pop())
      this.squares.unshift(newSquare)
      this.drawSquare(...newSquare)
      this.currentDirection = direction
    }
  }
}

const $canvas = document.querySelector('#game')
const $startButton = document.querySelector('#start-button')
const snake = new Snake($canvas)
let playing = false

$startButton.addEventListener('click', () => {
  if (!playing) {
    snake.start()
    $startButton.innerHTML = 'Stop'
  } else {
    snake.stop()
    $startButton.innerHTML = 'Start'
  }
  playing = !playing
})
