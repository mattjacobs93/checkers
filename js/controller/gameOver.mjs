import {NUM_ROWS,NUM_COLS,NUM_TILES} from "../model/model.mjs"
import {getValidMoves} from "./validator.mjs"
import { getDeepCopy } from "./getDeepCopy.mjs"
export {gameOver}




function gameOver (board) {
  let validMovesPlayer1 = []
  let validMovesPlayer2 = []
  for (let row = 0; row < NUM_ROWS; row++) {
    for (let col = 0; col < NUM_COLS; col++) {
      if (board[row][col] > 0) {
        let validMovesTemp = getValidMoves([row,col],getDeepCopy(board))
        validMovesTemp.forEach(move=>validMovesPlayer1.push(move))
      } else if (board[row][col] < 0) {
        let validMovesTemp = getValidMoves([row,col],getDeepCopy(board))
        validMovesTemp.forEach(move=>validMovesPlayer2.push(move))
      }
    }
  }

  if (validMovesPlayer1.length === 0) {
    return -1
  } else if (validMovesPlayer2.length === 0) {
    return 1
  } else {
    return 0
  }
}