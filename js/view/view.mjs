
/*-------------------------------- Imports --------------------------------*/
import {getValidMoves} from "../controller/validator.mjs"
import {Model,NUM_ROWS,NUM_COLS,NUM_TILES} from "../model/model.mjs"
import {CheckersPiece} from "../view/checkersPiece.mjs"
import { CheckersPieceHolder } from "./checkersPieceHolder.mjs"
/*-------------------------------- Export(s) --------------------------------*/
export {View}

/*-------------------------------- Constants --------------------------------*/






/*---------------------------- Variables (state) ----------------------------*/

let lightColorTile = '#C4A484'
let darkColorTile = '#a0522d'
// let lightPiece = 'X'
// let lightPieceKing = 'KX'
// let darkPiece = 'O'
// let darkPieceKing = 'KO'
// let emptyPiece = ''
let lightPiece = ''
let lightPieceKing = ''
let darkPiece = ''
let darkPieceKing = ''
let emptyPiece = ''


/*------------------------ Cached Element References ------------------------*/
const boardDisplay = document.getElementById('board')

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/


const pieceMap = {
   '2': lightPieceKing,
   '1': lightPiece,
   '0': emptyPiece,
  '-1': darkPiece,
  '-2': darkPieceKing,
}


class View {
  #controller
  #model
  bodyElement
  tiles
  moveFrom
  moveTo
  activePlayer
  boardDiv
  checkersPieceHolder

  constructor () {

  }


  /**
   * 
   * function renderMove (moveObject) {renders the move to screen}
   * 
   * function renderBoard() {renders board} 
   * 
   * function acceptButtonClick (evt) {gives controller row and col of clicked button}
   * 
   * function renderValidMovesToBoard(validMoves) {renders valid moves to board}
   *  
   */




  setActivePlayer(player) {
    this.activePlayer = player
  }


  addTiles(tiles) {
    this.tiles = tiles
    //console.log('my tiles', this.tiles)
  }

  setController (controller) {
    this.#controller = controller
  } 

  setModel (model) {
    this.#model = model
  }

  setBodyElement(body) {
    this.bodyElement = body
  }
  
  
  
  setBoardDiv(boardDiv) {
    this.boardDiv = boardDiv
  }

  setCheckersPieceHolder() {
    this.checkersPieceHolder = new CheckersPieceHolder(this.bodyElement)
  }

renderMove(moveObject) {
  //console.log('hi' ,moveObject.board)
  this.renderBoard(moveObject.board)

}

// updateMove (location,board) {

//   let locationValue = board[location[0]][location[1]]
//   if (!this.moveFrom) this.moveFrom = location
//   let validMovesFrom = getValidMoves(this.moveFrom,board).map(el=>el.movesArray[1][1])
//   console.log(validMovesFrom)
  
//   if ((locationValue > 0 && this.activePlayer.getCheckerTileValue() > 0) || (locationValue < 0 && this.activePlayer.getCheckerTileValue() < 0)) {
//     this.moveFrom = location
//     let validMovesMoveFrom = getValidMoves(this.moveFrom, board)
//     this.renderValidMovesToBoard(validMovesMoveFrom)
//    } else if (locationValue === 0 && location in validMovesFrom) {
//      this.moveTo = location
//      this.renderMove(this.moveFrom,this.moveTo)
//    }
 
//   console.log("loc value", locationValue)
//   let validMoves = getValidMoves(location,board)
//   //console.log('hi',validMoves)
//   this.renderValidMovesToBoard(validMoves)
// }
 
acceptBoardClick (evt) {
  let id = parseInt(evt.target.id)
  let row = Math.floor(id / NUM_ROWS)
  let col = id - (row*NUM_COLS)
  let location = [row,col]
  this.#controller.processClick(id, location)

  
  

  //console.log(id, row, col)
}

renderValidMovesToBoard (validMoves) {
  function addMoveToBoard(move,tiles) {
    let row = move[0]
    let col = move[1]
    let id = (NUM_COLS * row) + col
    //console.log(tiles)
    tiles[id].classList.add('possibleMoveTo')
    //document.getElementById(id.toString()).classList.add('possibleMove')
  }
 
 // console.log('2',validMoves, this.tiles)
  this.tiles.forEach(tiles=>tiles.classList.remove('possibleMoveTo'))
  validMoves.forEach(move=>{addMoveToBoard(move.movesArray[move.movesArray.length-1],this.tiles)})
}



// renderBoard(board) {
//   for (let i = 0; i < NUM_ROWS; i++) {
//     for (let j = 0; j < NUM_COLS; j++) {
//       let tileId = (i * NUM_COLS) + j
//       let currBoardValue = board[i][j]
//      // console.log(tileId, this.tiles[0])
//       this.tiles[tileId].textContent = pieceMap[currBoardValue.toString()]
//     }
//   }
// }


// makeNewPiece (currVal, tileId) {
//     let newPiece = document.createElement('div')
//     newPiece.style.gridArea(id.toString())
//     let classes = []
//     if (currVal < 0) classes.push('black')
//     else classes.push('red')

//     if (Math.abs(currVal) === 2) classes.push('king')
//     else classes.push('non-king')
//     classes.push('checkers-piece')

//     classes.forEach(classToAdd=>newPiece.classList.add(classToAdd))
//     //.bodyElement.appendChild(newPiece.pieceDiv)
//     //this.checkersPieces.push(newPiece)
//     return newPiece
// }

removeChildElements (tile) {
  while (tile.lastchild) {
    tile.removeLastChild()
  }
  // tile.innerHTML = ""
}


// renderBoard(board) {



//   for (let i = 0; i < NUM_ROWS; i++) {
//     for (let j = 0; j < NUM_COLS; j++) {
      
//       let tileId = (i * NUM_COLS) + j
//       //console.log('id', tileId)
//       let currBoardValue = board[i][j]
//       //console.log('currVal', currBoardValue)
//      // console.log(tileId, this.tiles[0])
//       //this.tiles[tileId].textContent = pieceMap[currBoardValue.toString()]
//       let currTile = this.tiles[tileId]
//       this.removeChildElements(currTile)
//       console.log('hi')
//       //removeChildElements()
//      if (currBoardValue !== 0) currTile.appendChild(this.makeNewPiece(currBoardValue,tileId))

//     }
//   }
// }


renderActiveTile(id) {
  this.tiles.forEach(tile => tile.classList.remove('activeTile'))
  if (id) this.tiles[id].classList.add('activeTile')
}

cleanBoard() {
  this.tiles.forEach(tile => {tile.classList.remove('possibleMoveFrom'); tile.classList.remove('possbileMoveTo')})
}

renderPossibleFromTiles (board) {
  let possibleMovesBoard = this.#controller.getLocationsOfPossibleMovesFrom(board)
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      this.tiles[(row * NUM_COLS) + col].classList.remove('possibleMoveFrom')
        if (possibleMovesBoard[row][col] === 1) {
          //console.log(this.tiles)
          this.tiles[(row * NUM_COLS) + col].classList.add('possibleMoveFrom')
        }


    }

  }
}

createBoardAtBeginning(boardGame) {
  let boardDiv = this.boardDiv

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

  //this.renderBoard(boardGame)

}

rowAndColToID (row,col) {
  return (row * NUM_COLS) + col
}

renderBoard(board) {

  this.checkersPieceHolder.emptyCheckersPiecesList()
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
     // console.log(board[row][col])
     let currVal = board[row][col]
     if (!currVal) continue
     let newPiece
     console.log('hi')
     newPiece = this.checkersPieceHolder.makeNewPiece(currVal)
     console.log(newPiece)
     if (newPiece) this.checkersPieceHolder.setPiecePosition(newPiece,this.rowAndColToID(row,col),this.tiles) 
      
      
    }
  }
}

}