document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    let squares = Array.from(document.querySelectorAll('.grid div'));
    const scoreDisplay = document.querySelector('#score');
    const startButton = document.querySelector('#start-button');
    const width = 10;

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
    timerId = setInterval(moveDown, 700)

    // fucntion for the keycodes
    

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
    random = Math.floor(Math.random()*theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    draw()
    } 
  }

// move the tetromino to the left of the screen
  function moveLeft() {
  undraw()
  const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0);
  
  if(!isAtLeftEdge) currentPosition -=1;

  if(current.some(index => squares[currentPosition + index].classList.contains('taken')))
  currentPosition +=1;
}

draw()


})

