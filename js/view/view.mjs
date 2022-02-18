
/*-------------------------------- Imports --------------------------------*/
import {Model,NUM_ROWS,NUM_COLS,NUM_TILES} from "../model/model.mjs"
/*-------------------------------- Export(s) --------------------------------*/
export {View}

/*---------------------------- Variables (state) ----------------------------*/

let lightColorTile = '#C4A484'
let darkColorTile = '#a0522d'


/*------------------------ Cached Element References ------------------------*/
const boardDisplay = document.getElementById('board')

const classMap = {
  '2': 'red-checker-king',
  '1': 'red-checker-non-king',
  '0': 'empty-dark',
 '-1': 'black-checker-non-king',
 '-2': 'black-checker-king',
}

/*-------------------------------- Classes --------------------------------*/

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
  isOn

  constructor () {
    this.isOn = true

  }

  setActivePlayer(player) {
    this.activePlayer = player
  }


  addTiles(tiles) {
    this.tiles = tiles
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

renderMove(moveObject) {
  
  this.renderBoard(moveObject.board)

}
 
acceptBoardClick (evt) {
  if (this.isOn) {
    let id = parseInt(evt.target.id)
    let row = Math.floor(id / NUM_ROWS)
    let col = id - (row*NUM_COLS)
    let location = [row,col]
    this.#controller.processClick(id, location)
  }
  
}

renderGameOver(outcome) {
  this.turnOff()
  let menu = document.createElement('div')
  menu.classList.add('game-over-display')
  let newParagraph = document.createElement('p')
  newParagraph.textContent = `Player ${(outcome === 1) ? 1 : 2} is the winner!!!`
  this.bodyElement.appendChild(menu)
  menu.appendChild(newParagraph)
  menu.style.width = '67.5vh'
  menu.style.height = '42vh'
  menu.style.position = 'relative'
  menu.style.top = '16.5vh'
}

renderValidMovesToBoard (validMoves) {
  function addMoveToBoard(move,tiles) {
    let row = move[0]
    let col = move[1]
    let id = (NUM_COLS * row) + col
    tiles[id].classList.add('possibleMoveTo')
  }
 
  this.tiles.forEach(tiles=>tiles.classList.remove('possibleMoveTo'))
  validMoves.forEach(move=>{addMoveToBoard(move.movesArray[move.movesArray.length-1],this.tiles)})
}

renderBoard(board) {

  this.cleanBoard()
 
  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      let tileId = (i * NUM_COLS) + j
      let currTile = this.tiles[tileId]
      if (currTile.classList.contains('empty-light')) continue

      let currBoardValue = board[i][j]
      currTile.removeAttribute('class')
      currTile.setAttribute('class',classMap[currBoardValue.toString()])     
    }
  }
}

removeChildElements (tile) {
  while (tile.lastchild) {
    tile.removeLastChild()
  }
}


renderActiveTile(id) {
  this.tiles.forEach(tile => tile.classList.remove('activeTile'))
  if (id) this.tiles[id].classList.add('activeTile')
}

toggleHover () {}

turnHoverOn () {
  this.boardDiv.classList.remove('hoverable')
  this.boardDiv.classList.add('hoverable')
}

turnHoverOff () {
    this.boardDiv.classList.remove('hoverable')
}

turnOff () {
  this.isOn = false
  this.cleanBoard()
  this.turnHoverOff()
  this.boardDiv.style.opacity = '0.3';
}


turnOn () {
  this.isOn = true
  this.boardDiv.style.opacity = '1.0';
  this.turnHoverOn()
  this.renderPossibleFromTiles(this.#controller.getBoardCopy())
}
cleanBoard() {
  this.tiles.forEach(tile => {tile.classList.remove('possibleMoveFrom'); tile.classList.remove('possbileMoveTo')})
  this.tiles.forEach(tile=>tile.classList.remove('activeTile'))
}

renderPossibleFromTiles (board) {
  let possibleMovesBoard = this.#controller.getLocationsOfPossibleMovesFrom(board)
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      this.tiles[(row * NUM_COLS) + col].classList.remove('possibleMoveFrom')
        if (possibleMovesBoard[row][col] === 1) {
          this.tiles[(row * NUM_COLS) + col].classList.add('possibleMoveFrom')
        }


    }

  }
}

createBoardAtBeginning(boardGame) {
    let boardDiv = this.boardDiv
  
    function makeTile (row, col, idx) {
      let tile = document.createElement('div')
      tile.classList.add((((idx%2)+(row%2))%2 === 1) ? 'empty-dark' : 'empty-light')
      tile.id = idx.toString()
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

rowAndColToID (row,col) {
    return (row * NUM_COLS) + col 
  }

}