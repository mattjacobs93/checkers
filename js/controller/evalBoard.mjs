
import { NUM_ROWS, NUM_COLS, NUM_TILES } from "../model/model.mjs"
export {evalBoard}

function evalBoard (board, gameResult) {

  if (gameResult === 1) return Infinity
  if (gameResult === -1) return -1 * Infinity

  let scorePlayer1 = 0
  let scorePlayer2 = 0

  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      let currValue = board[row][col]
      if (currValue > 0) scorePlayer1 += currValue
      else if (currValue < 0) scorePlayer2 += Math.abs(currValue)
    }
  }
return scorePlayer1 - scorePlayer2
}