/*-------------------------------- Exports --------------------------------*/
export {Player}
/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Classes --------------------------------*/

class Player {
  #opponent
  #checkerTile
  #kingTile
  constructor (playerNum) {
    this.#checkerTile = playerNum
    this.#kingTile = playerNum * 2
  }

  setOpponent (opponent) {
    this.#opponent = opponent
  }

  getOpponent () {
    return this.#opponent
  }

  getTilePieceChar() {
    
  }
}


/*-------------------------------- Functions --------------------------------*/

