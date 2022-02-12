
export {getValidMoves}

let board =  [
  [0,-1,0,-1,0,-1,0,-1],
  [-1,0,-1,0,-1,0,-1,0],
  [0,-1,0,-1,0,-1,0,-1],
  [0,0,0,0,0,0,0,0],
  [0,0,0,-1,0,0,0,0],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
]


class Move {
  skip
  board
  movesArray
  constructor (moveLocation, board) {
    this.movesArray = [moveLocation]
    this.skip = false
    this.board = board
  }

  copy (){
      let copyMove = new Move([...this.movesArray], [...this.board])
      copyMove.movesArray = copyMove.movesArray[0]
      return copyMove
  }



}


class ValidMoves {
  constructor () {
    this.validMovesArray = []
  }
}



function getValidMovesPlayer1Checker (location, board) {
  let validMovesObj = new ValidMoves()
  // let topLeft = [location[0]-1,location[1]-1]
  // let topRight = [location[0] -1,location[1] + 1]
  // let bottomLeft = [location[0]-1,location[1]-1]
  // let bottomRight = [location[0] -1,location[1] + 1]
  //let skipRight = [location[0] - 2, location[1] + 2]
  //let skipLeft = [location[0] - 2, location[1] - 2]


 function checkImmediatelyAdjacent (startingLocation, possibleAdjacent, board, validMovesObj) {

  
  try {
    if (board[possibleAdjacent[0]][possibleAdjacent[1]] === 0) {
      let newBoard = [...board]
      newBoard[possibleAdjacent[0]][possibleAdjacent[1]] = 1
      newBoard[startingLocation[0]][startingLocation[1]] = 0
      let movesArray = [startingLocation, possibleAdjacent]
      let newMove = new Move(movesArray, newBoard)
      newMove.movesArray = newMove.movesArray[0]
      validMovesObj.validMovesArray.push(newMove)

    }
   } catch {

   }

 }

 let pieceValue = board[location[0]][location[1]]

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {

      if (Math.abs(pieceValue) > 1 || (pieceValue === 1 && i === -1) || (pieceValue === -1 && i === 1)) {
        let possibleAdjacent = [location[0] + i, location[1] + j]
        checkImmediatelyAdjacent(location, possibleAdjacent, board, validMovesObj)
      }

    }
  }


 //checkImmediatelyAdjacent(location, topLeft, board)
 //checkImmediatelyAdjacent(location, topRight, board)

 function skip(location, board, validMovesObj, numMoves, moveObj) {
   //if numMoves = 0, don't add self to validMoves,
  //increment numMoves by 1 after each iteration
  //basically just don't add the starting position

  if (numMoves > 0) {
    moveObj.movesArray.push(location)
    validMovesObj.validMovesArray.push(moveObj) 
  }

  let pieceValue = board[location[0]][location[1]] 

  for (let i = -2; i <= 2; i += 4) {
    for (let j = -2; j <= 2; j += 4) {
      if (pieceValue === 1 && i === 2) continue
      if (pieceValue === -1 && i === -2) continue
     // if (numMoves > 0) 
      
      try {
            let adjacentLocation = [location[0] + parseInt(i/2), location[1] + parseInt(j/2)]
            let adjacentValue = board[adjacentLocation[0]][adjacentLocation[1]]
            let skipLocation = [location[0] + i, location[1] + j]
            let skipLocationIsEmpty = (board[skipLocation[0]][skipLocation[1]] === 0) ? true : false
           // let skipValue = board[skipLocation[0]][skipLocation[1]]
            let adjacentIsOpponent = ((pieceValue > 0 && adjacentValue < 0) || (pieceValue < 0 && adjacentValue > 0)) ? true : false

            if (skipLocationIsEmpty && adjacentIsOpponent) {
              let boardCopy = [...board]
              boardCopy[location[0]][location[1]] = 0
              boardCopy[skipLocation[0]][skipLocation[1]] = pieceValue
              boardCopy[adjacentLocation[0]][adjacentLocation[1]] = 0
              let moveObjCopy = moveObj.copy()
              skip(skipLocation,boardCopy,validMovesObj,numMoves+1,moveObjCopy)
            }

        }

        catch {

        }


    }
  }

 }
 
 
 skip(location,board,validMovesObj,0,new Move(location,board))
 
 //console.log(validMoves)
 return validMovesObj
}


function getValidMoves(location, board) {
  let locationRow = location[0]
  let locationCol = location[1]  
  let valueAtLocation = board[locationRow][locationCol]

  if (valueAtLocation === 1) return getValidMovesPlayer1Checker(location,board)
} 


let validMovesArray = getValidMoves([5,2],board)
console.log(validMovesArray)

