/*-------------------------------- Exports --------------------------------*/
export {Player, ActivePlayer}
/*-------------------------------- Classes --------------------------------*/


class ActivePlayer {
  #players
  #activePlayerNum
  constructor() {
    this.#activePlayerNum = 0
  }

  setPlayers(player1,player2) {
    this.#players = [player1, player2]
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

  isAI () {
    return this.#players[this.#activePlayerNum].isPlayerAI()
  }

  getDepth() {
    return this.#players[this.#activePlayerNum].getDepth()
  }
}


class Player {
  #opponent
  #checkerTile
  #kingTile
  #isAI
  #depth
  constructor (playerNum,isAI,depth=0) {
    this.#checkerTile = playerNum
    this.#kingTile = playerNum * 2
    this.#isAI = isAI
    this.#depth = depth
  }

  getDepth () {
    return this.#depth
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

  isPlayerAI () {
    return this.#isAI
  }
}

