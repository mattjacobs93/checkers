/*-------------------------------- Exports --------------------------------*/
export {Player, ActivePlayer}
/*-------------------------------- Constants --------------------------------*/

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/

/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Classes --------------------------------*/


class ActivePlayer {
  #players
  #activePlayerNum
  constructor(player1,player2) {
    this.#players = [player1, player2]
    this.#activePlayerNum = 0
  }

  tileBelongsToPlayer(locationValue) {
      return this.#players[this.#activePlayerNum].tileBelongsToPlayer(locationValue)
  }

  toggleActivePlayer () {
    this.#activePlayerNum = (this.#activePlayerNum + 1) % 2
  }

  getActivePlayer() {
    return this.#activePlayerNum
  }
}


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

  getCheckerTileValue() {
    return this.#checkerTile
  }
  
  tileBelongsToPlayer(locationValue) {
    return (locationValue > 0 && this.#checkerTile > 0) || (locationValue < 0 && this.#checkerTile < 0)
  }
}


/*-------------------------------- Functions --------------------------------*/

