/*--------------------------------export --------------------------------*/

export {Model,NUM_ROWS,NUM_COLS,NUM_TILES} 

/*-------------------------------- Constants --------------------------------*/

const NUM_ROWS = 8
const NUM_COLS = 8
const NUM_TILES = NUM_ROWS * NUM_COLS

/*-------------------------------- Classes --------------------------------*/

class Model {
  #board
  #controller
  
  constructor () {
    this.#board =  [
      [0,-1,0,-1,0,-1,0,-1],
      [-1,0,-1,0,-1,0,-1,0],
      [0,-1,0,-1,0,-1,0,-1],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [1,0,1,0,1,0,1,0],
      [0,1,0,1,0,1,0,1],
      [1,0,1,0,1,0,1,0],
    ]
  }

  setController(controller) {
    this.#controller = controller
  }

  getGameBoard () {
    return this.#board
  }

  getGameBoardCopy () {
    return this.#board.slice().map(el=>el.slice())
  }

  setBoard(board) {
    this.#board = board
  }

}

