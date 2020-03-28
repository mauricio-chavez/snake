const $canvas = document.querySelector('#game')
const $startButton = document.querySelector('#start-button')
const $score = document.querySelector('#score')
const snake = new Snake($canvas)
let playing = false

snake.addEventListener('gameOver', () => {
  $startButton.innerHTML = 'Start'
  playing = false
})

snake.addEventListener('scoreChanged', e => {
  $score.innerHTML = e.target.score
})

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
