import { Move } from "./validator.mjs";
export {MoveSequence} 

class MoveSequence {
  movesArray
  value
  constructor(move) {
    this.movesArray = [move]
    this.value = move.value
  }

  addMove (move) {
    this.movesArray.push(move)
    this.value += move.value 
  }

  getLastMove() {
    return this.movesArray[this.movesArray.length-1]
  }
}