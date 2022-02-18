import { NUM_ROWS } from "../model/model.mjs"

export {getValidMoves,Move}

class Move {
  skip
  board
  movesArray
  value
  constructor (moveLocation, board) {
    this.movesArray = [moveLocation]
    this.skip = false
    this.board = board
  }

  copy (){
      let copyMove = new Move([...this.movesArray].map(el=>el.slice()), [...this.board].map(el=>el.slice()))
      copyMove.movesArray = copyMove.movesArray[0]
      return copyMove
  }



}


class ValidMoves {
  constructor () {
    this.validMovesArray = []
  }
}



function getValidMoves (location, board) {
  let validMoves = []

 function checkImmediatelyAdjacent (startingLocation, possibleAdjacent, board, validMoves) {

  
  try {
    if (board[possibleAdjacent[0]][possibleAdjacent[1]] === 0) {
      let newBoard = board.slice().map(el=>el.slice())
      newBoard[possibleAdjacent[0]][possibleAdjacent[1]] = newBoard[startingLocation[0]][startingLocation[1]];
      newBoard[startingLocation[0]][startingLocation[1]] = 0;
      let movesArray = [startingLocation, possibleAdjacent]
      let newMove = new Move(movesArray, newBoard)
      newMove.movesArray = newMove.movesArray[0]
      validMoves.push(newMove)
    }
   } catch {

   }

 }

 let pieceValue = board[location[0]][location[1]]

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {

      if (Math.abs(pieceValue) > 1 || (pieceValue === 1 && i === -1) || (pieceValue === -1 && i === 1)) {
        let possibleAdjacent = [location[0] + i, location[1] + j]
        checkImmediatelyAdjacent(location, possibleAdjacent, board, validMoves)
      }

    }
  }

 function skip(location, board, validMoves, numMoves, moveObj) {

  if (numMoves > 0) {
    moveObj.movesArray.push(location)
    moveObj.board = board
    validMoves.push(moveObj) 
  }

  let pieceValue = board[location[0]][location[1]] 
  

  for (let i = -2; i <= 2; i += 4) {
    for (let j = -2; j <= 2; j += 4) {
      if (pieceValue === 1 && i === 2) continue
      if (pieceValue === -1 && i === -2) continue 
      try {
            let adjacentLocation = [location[0] + parseInt(i/2), location[1] + parseInt(j/2)]
            let adjacentValue = board[adjacentLocation[0]][adjacentLocation[1]]
            let skipLocation = [location[0] + i, location[1] + j]
            let skipLocationIsEmpty = (board[skipLocation[0]][skipLocation[1]] === 0) ? true : false
            let adjacentIsOpponent = ((pieceValue > 0 && adjacentValue < 0) || (pieceValue < 0 && adjacentValue > 0)) ? true : false
            if (skipLocationIsEmpty && adjacentIsOpponent) {
              let boardCopy = [...board]
              boardCopy[location[0]][location[1]] = 0
              boardCopy[skipLocation[0]][skipLocation[1]] = pieceValue
              boardCopy[adjacentLocation[0]][adjacentLocation[1]] = 0
              let moveObjCopy = moveObj.copy()
              skip(skipLocation,boardCopy,validMoves,numMoves+1,moveObjCopy)
            }

        }

        catch {

        }


    }
  }

 }
 
 skip(location,board,validMoves,0,new Move(location,[...board]))
 
const makeKings = (validMoves) => {
  validMoves.forEach(el => {
    el.board[NUM_ROWS-1] = el.board[NUM_ROWS-1].map(el => (el === -1) ? -2 : el )
    el.board[0] = el.board[0].map(el => (el === 1) ? 2 : el)
  })
}

  

makeKings(validMoves)

 return validMoves
}


