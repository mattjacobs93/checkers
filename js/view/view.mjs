
/*-------------------------------- Imports --------------------------------*/
import {getValidMoves} from "../controller/validator.mjs"
import {Model,NUM_ROWS,NUM_COLS,NUM_TILES} from "../model/model.mjs"
 

/*-------------------------------- Export(s) --------------------------------*/
export {View}

/*-------------------------------- Constants --------------------------------*/






/*---------------------------- Variables (state) ----------------------------*/

let lightColorTile = '#C4A484'
let darkColorTile = '#a0522d'
let lightPiece = 'X'
let darkPiece = 'O'

/*------------------------ Cached Element References ------------------------*/
const boardDisplay = document.getElementById('board')

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/




class View {
  #controller
  #model
  tiles

  constructor () {

  }

  addTiles(tiles) {
    this.tiles = tiles
    console.log('my tiles', this.tiles)
  }

  setController (controller) {
    this.#controller = controller
  } 

  setModel (model) {
    this.#model = model
  }
 
boardClicked (evt) {
  let id = parseInt(evt.target.id)
  let row = Math.floor(id / NUM_ROWS)
  let col = id - (row*NUM_COLS)
  let move = [row,col]

  let board = this.#controller.getBoardCopy()
  let validMoves = getValidMoves(move,board)
  console.log('hi',validMoves)
  this.addValidMovesToBoard(validMoves)
  //console.log(id, row, col)
}

addValidMovesToBoard (validMoves) {
  function addMoveToBoard(move,tiles) {
    let row = move[0]
    let col = move[1]
    let id = (NUM_COLS * row) + col
    console.log(tiles)
    tiles[id].classList.add('possibleMove')
    //document.getElementById(id.toString()).classList.add('possibleMove')
  }
 
  console.log('2',validMoves, this.tiles)
  this.tiles.forEach(tiles=>tiles.classList.remove('possibleMove'))
  validMoves.forEach(move=>{addMoveToBoard(move.movesArray[move.movesArray.length-1],this.tiles)})
}

createBoardDisplay(boardDiv,boardGame) {


  function makeTile (row, col, idx) {

    function setTileBackground (tile) {
      //console.log(tile.classList)
      if (tile.classList.contains('light')) tile.style.backgroundColor = lightColorTile
      else tile.style.backgroundColor = darkColorTile
      
    }

    let tile = document.createElement('div')

    //console.log(board)
    tile.classList.add((((idx%2)+(row%2))%2 === 1) ? 'dark' : 'light')
    tile.id = idx.toString()
    tile.textContent = (boardGame[row][col] === 0 ) ? ' '
      : (boardGame[row][col] >= 1) ? lightPiece
      : darkPiece
    setTileBackground(tile, idx)
    return tile
  }
  


  
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      let idx = (row * NUM_COLS) + col
      let tile = makeTile(row,col,idx)
      boardDiv.appendChild(tile)
    }

  }

}

}