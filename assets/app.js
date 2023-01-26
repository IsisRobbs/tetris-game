document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;
    let nextRandom = 0

    // console.log(squares);

    // the Tetrominoes

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]
    // console.log(lTetromino)

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetronimo = [
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
      ]
    
      const oTetromino = [
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1],
        [0,1,width,width+1]
      ]
    
      const iTetromino = [
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3],
        [1,width+1,width*2+1,width*3+1],
        [width,width+1,width+2,width+3]
      ]


      const theTetrominoes = [lTetromino, zTetromino, tTetronimo, oTetromino, iTetromino];

      let currentPosition = 4;
      // Each rotation of the tetromino will start in the first roation
      let currentRotation = 0;
      
      // randomly select a tetromino
      let random = Math.floor(Math.random()*theTetrominoes.length);
      
      // randomly picks a tetromino and starts in the first rotation
      let current = theTetrominoes[random][0];
      
     
      // draw the Tetromino
     function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
      }

      // draw()

      // undraw the tetromino
     function undraw() {
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('tetromino')
      })
     }

    //  make the tetromino move down every second
    timerId = setInterval(moveDown, 1000)

    // fucntion for the keycodes
    window.document.body.addEventListener('keydown', function(event){
     if(event.key === 'ArrowLeft'){
       return moveLeft()
     } else if (event.key === 'ArrowRight') {
         return moveRight()
     } else if (event.key === 'ArrowUp') {
        return rotate()
     }else if (event.key === 'ArrowDown') {
      return moveDown()
     }
    }
    )

    // the tetromino moves down
   function moveDown() {
      undraw()
      currentPosition+= width
      draw()
      freeze()
    }

    // create a freeze function
    function freeze() {
    if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    // start a new tetronimo to fall
    random = nextRandom
    nextRandom = Math.floor(Math.random()*theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw()
    displayShape()
    } 
  }

// move the tetromino to the left of the screen
  function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
  
  if(!isAtLeftEdge) currentPosition -=1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
  {currentPosition +=1;
  }
  draw()
}

// move the tetromino to the right, unless it is at the edge
function moveRight() {
  undraw()
  const isAtRightEdge = current.some(index => (currentPosition + index) % width === width-1);
  
  if(!isAtRightEdge) currentPosition +=1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
  {currentPosition -=1;
  }
  draw()
}

// rotate the tetromino
function rotate() {
  undraw()
  currentRotation ++
  if(currentRotation === current.length) {
    currentRotation = 0
  }
  current = theTetrominoes[random][currentRotation]
  draw()
}

// show up-next tetromino in mini-grid display
const displaySquares = document.querySelectorAll('.mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

// the Tetrominoes without rotations
const upNextTetrominoes = [
  [1, displayWidth+1, displayWidth*2+1, 2], //lTetromino
  [0, displayWidth, displayWidth+1, displayWidth*2+1], //zTetromino
  [1,displayWidth,displayWidth+1,displayWidth+2], //tTetromino
  [0,1,displayWidth,displayWidth+1], //oTetromino
  [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1] //iTetromino
]

// display the shape in the mini-grid display
function displayShape() {
  // remove any trace of a tetromino form the entire gird
  displaySquares.forEach(square => {
    square.classList.remove('tetromino')
  })
  upNextTetrominoes[nextRandom].forEach( index => {
    displaySquares[displayIndex + index].classList.add('tetromino')
  })
}

startButton.addEventListener('click', () => {
if (timerId){
  clearInterval(timerId)
  timerId = null
} else {
  draw()
  timerId = setInterval(moveDown, 1000)
  nextRandom = Math.floor(Math.random()*theTetrominoes.length)
  displayShape()
}
})


})

