

/*-------------------------------- Export(s) --------------------------------*/
export {boardDisplay, createBoardDisplay}

/*-------------------------------- Constants --------------------------------*/

const NUM_ROWS = 8
const NUM_COLS = 8
const NUM_TILES = NUM_ROWS * NUM_COLS


/*---------------------------- Variables (state) ----------------------------*/

let lightColorTile = '#C4A484'
let darkColorTile = '#a0522d'
let lightPiece = 'X'
let darkPiece = 'O'

/*------------------------ Cached Element References ------------------------*/
const boardDisplay = document.getElementById('board')

/*----------------------------- Event Listeners -----------------------------*/
boardDisplay.addEventListener('click', boardClicked)
/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/


function boardClicked (evt) {
  console.log(evt.target.id)
}

function createBoardDisplay(board) {


  function makeTile (row, col, idx) {

    function setTileBackground (tile) {
      console.log(tile.classList)
      if (tile.classList.contains('light')) tile.style.backgroundColor = lightColorTile
      else tile.style.backgroundColor = darkColorTile
      
    }

    let tile = document.createElement('div')

    
    tile.classList.add((((idx%2)+(row%2))%2 === 1) ? 'dark' : 'light')
    tile.id = idx.toString()
    tile.textContent = (board[row][col] === 0 ) ? ' '
      : (board[row][col] === 1) ? lightPiece
      : darkPiece
    setTileBackground(tile, idx)
    return tile
  }
  


  
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      let idx = (row * NUM_COLS) + col
      let tile = makeTile(row,col,idx)
      board.appendChild(tile)
    }

  }

}


function addPiecesToBoardAtStart () {
  let initialBoard

}


function render(board) {

}


