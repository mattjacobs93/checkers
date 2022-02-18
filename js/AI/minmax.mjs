import { getValidMoves } from "../controller/validator.mjs"
import * as modelImport from "../model/model.mjs"
import { gameOver } from "../controller/gameOver.mjs"
import { evalBoard } from "../controller/evalBoard.mjs"

export {minmax}

const NUM_ROWS = modelImport.NUM_ROWS
const NUM_COLS = modelImport.NUM_COLS
const playerMap = {
  0:1,
  1:-1,
}

const deepCopyBoard = (board) => {
  return board.slice().map(el=>el.slice())
}

const belongsToPlayer = (player,currValue) => {
  let playerValue = playerMap[player.toString()]; 
  return (playerValue>0 && currValue>0) || (playerValue<0 && currValue<0)
} 


function minmax (moveObject,currDepth,maxDepth,player,alpha,beta) {



  function makeChildren(moveObj,player) {
    let children = []
    let board = deepCopyBoard(moveObj.board)
    for (let row = 0; row < NUM_ROWS; row++) {
      for (let col = 0; col < NUM_COLS; col++) {
        if (belongsToPlayer(player,board[row][col])) {
          let validMoves = getValidMoves([row,col],deepCopyBoard(board))
          validMoves.forEach(move=>children.push(move))
       }
      }
    }

    return children
  }

      let gameResult = gameOver(moveObject.board)
      
      if (currDepth === maxDepth || gameResult !== 0) {
        return evalBoard(moveObject.board, gameResult)
      }




  let children = makeChildren(moveObject,player)
  let minIdx = -1
  let maxIdx = -1
  let minChild
  let maxChild
  let numChildren = children.length
  for (let i = 0; i < numChildren; i++) {
    let child = children[i]
    let solvedChildValue = minmax(child,currDepth+1,maxDepth,(player+1)%2,alpha,beta)
    child.value = solvedChildValue
    if (player === 0) {
        if (child.value > beta) {
            maxChild = child
            break
          }
        if (child.value > alpha) alpha = child.value
      } else if (player === 1) {
        if (child.value < alpha) {minChild = child; break}
        if (child.value < beta) beta = child.value
      }
   
    if (!maxChild && !minChild) {
           maxChild = child
           minChild = child
           maxIdx = i
           minIdx = i
       }
       
    else if (child.value > maxChild.value) {maxChild = child; maxIdx = i}
    else if (child.value < minChild.value) {minChild = child; minIdx = i}
  }

if (currDepth === 0) {
  if (player === 0) return maxChild
  else return minChild
}
else {
  if (player === 0) return maxChild.value
  else return minChild.value
  }
}