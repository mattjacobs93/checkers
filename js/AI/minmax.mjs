import { getValidMoves } from "../controller/validator.mjs"
import * as modelImport from "../model/model.mjs"
import { MoveSequence } from "../controller/moveSequence.mjs"
import { gameOver } from "../controller/gameOver.mjs"
import { evalBoard } from "../controller/evalBoard.mjs"

export {minmax}

//const MAX_DEPTH = 3
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
  //console.log(player,playerValue); 
  return (playerValue>0 && currValue>0) || (playerValue<0 && currValue<0)
} 


function minmax (moveObject,currDepth,maxDepth,player) {



  function makeChildren(moveObj,player) {
    let children = []
    let board = deepCopyBoard(moveObj.board)
    //console.log('deep copy of board', board)
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


  // function minmaxHelper (moveObject, currDepth, maxDepth,player) {

  //     let gameResult = gameOver(moveObject.board)
  //     //base case
  //     if (currDepth === maxDepth || gameResult !== 0) {
  //       return evalBoard(moveObject.board, gameResult)
  //     }

    
  //     let children = makeChildren(moveObject,player)

  //     children.forEach (child => {

  //     })


  //     return 0
     
  // }



 // console.log('making children at top level')

  let children = makeChildren(moveObject,player)
 // console.log(children)
  let minIdx = -1
  let maxIdx = -1
  let minChild
  let maxChild

//console.log('my children', children)

  children.forEach((child,i) => {
   // console.log('about to call minmax helper')
    child.value = minmax(child,currDepth+1,maxDepth,(player+1)%2).value
    
    //console.log('called minmax helper')

    if (!maxChild && !minChild) {
        maxChild = child
        minChild = child
        maxIdx = i
        minIdx = i
    }
    
    else if (child.value > maxChild.value) {maxChild = child; maxIdx = i}
    else if (child.value < minChild.value) {minChild = child; minIdx = i}
  })

  console.log('about to return from minmax')
  if (player === 0) return maxChild
  else return minChild
}