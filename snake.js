class Snake extends EventTarget {
  score = 0
  squares = []
  currentDirection = 'LEFT'
  randomSquare = null
  DIRECTIONS = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    UP: 'UP',
    DOWN: 'DOWN'
  }

  constructor(canvas) {
    super()
    this.borderWidth = canvas.width
    this.borderHeight = canvas.height
    if (this.borderWidth % 10 !== 0 || this.borderHeight % 10 !== 0) {
      throw 'Canvas dimensions must be multiple of ten'
    }
    this.ctx = canvas.getContext('2d')
    this.ctx.fillStyle = 'rgb(50,205,50)'
  }

  start() {
    const x = Math.floor(this.borderWidth / 2)
    const y = Math.floor(this.borderHeight / 2)

    this.drawSquare(x, y)
    this.drawSquare(x + 10, y)
    this.drawSquare(x + 20, y)
    this.squares.push({x, y})
    this.squares.push({x: x + 10, y})
    this.squares.push({x: x + 20, y})

    this.generateRandomSquare()

    document.onkeydown = e => {
      switch (e.keyCode) {
        case 38:
          this.setDirection(this.DIRECTIONS.UP)
          break
        case 40:
          this.setDirection(this.DIRECTIONS.DOWN)
          break
        case 37:
          this.setDirection(this.DIRECTIONS.LEFT)
          break
        case 39:
          this.setDirection(this.DIRECTIONS.RIGHT)
          break
      }
    }

    this.interval = setInterval(() => {
      this.move(this.currentDirection)
    }, 100)
  }

  setDirection(direction) {
    switch (direction) {
      case this.DIRECTIONS.UP:
        if (this.currentDirection === this.DIRECTIONS.DOWN) {
          return
        } else {
          break
        }
      case this.DIRECTIONS.DOWN:
        if (this.currentDirection === this.DIRECTIONS.UP) {
          return
        } else {
          break
        }
      case this.DIRECTIONS.LEFT:
        if (this.currentDirection === this.DIRECTIONS.RIGHT) {
          return
        } else {
          break
        }
      case this.DIRECTIONS.RIGHT:
        if (this.currentDirection === this.DIRECTIONS.LEFT) {
          return
        } else {
          break
        }
    }
    this.currentDirection = direction
  }

  stop() {
    this.pause()
    for (let i = 0; i < this.squares.length; i++) {
      this.clearSquare(this.squares[i].x, this.squares[i].y)
    }
    this.resetScore()
    this.squares = []
    this.currentDirection = 'LEFT'
    this.clearSquare(this.randomSquare.x, this.randomSquare.y)
    this.randomSquare = null
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  drawSquare(x, y) {
    this.ctx.fillRect(x, y, 10, 10)
  }

  clearSquare(x, y) {
    this.ctx.clearRect(x, y, 10, 10)
  }

  generateRandomSquare() {
    let unique = true
    let x
    let y

    do {
      x = Math.floor(Math.random() * ((this.borderHeight - 10) / 10 + 1)) * 10
      y = Math.floor(Math.random() * ((this.borderHeight - 10) / 10 + 1)) * 10
      this.squares.forEach(square => {
        if (x === square.x && y === square.y) {
          unique = false
        }
      })
    } while (!unique)

    this.ctx.fillStyle = 'rgb(34,139,34)'
    this.drawSquare(x, y)
    this.ctx.fillStyle = 'rgb(50,205,50)'
    this.randomSquare = {x, y}
  }

  collides(x, y) {
    if (
      x < 0 ||
      x > this.borderWidth - 10 ||
      y < 0 ||
      y > this.borderHeight - 10
    ) {
      return true
    } else {
      for (let i = 0; i < this.squares.length; i++) {
        if (x === this.squares[i].x && y === this.squares[i].y) {
          return true
        }
      }
    }
    return false
  }

  increaseScore() {
    this.score++
    this.dispatchEvent(new Event('scoreChanged'))
  }

  resetScore() {
    this.score = 0
    this.dispatchEvent(new Event('scoreChanged'))
  }

  checkMove(newSquare) {
    if (this.collides(newSquare.x, newSquare.y)) {
      this.pause()
      alert('You lost!')
      this.stop()
      this.dispatchEvent(new Event('gameOver'))
      return
    } else if (
      newSquare.x === this.randomSquare.x &&
      newSquare.y === this.randomSquare.y
    ) {
      this.increaseScore()
      this.generateRandomSquare()
    } else {
      const clearedSquare = this.squares.pop()
      this.clearSquare(clearedSquare.x, clearedSquare.y)
    }

    this.squares.unshift(newSquare)
    this.drawSquare(newSquare.x, newSquare.y)
  }

  move(direction) {
    let newSquare
    let x = this.squares[0].x
    let y = this.squares[0].y
    switch (direction) {
      case this.DIRECTIONS.UP:
        newSquare = {x, y: y - 10}
        break
      case this.DIRECTIONS.DOWN:
        newSquare = {x, y: y + 10}
        break
      case this.DIRECTIONS.LEFT:
        newSquare = {x: x - 10, y}
        break
      case this.DIRECTIONS.RIGHT:
        newSquare = {x: x + 10, y}
        break
    }
    this.checkMove(newSquare)
  }
}
