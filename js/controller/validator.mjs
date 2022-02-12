
export {getValidMoves}

let board =  [
  [0,-1,0,-1,0,-1,0,-1],
  [-1,0,-1,0,-1,0,-1,0],
  [0,-1,0,-1,0,-1,0,-1],
  [0,0,0,0,0,0,0,0],
  [0,1,0,1,0,0,0,0],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
]


class Move {
  skip
  board
  movesArray
  constructor (move, board) {
    this.movesArray = [move]
    this.skip = false
    this.board = board
  }



}






function getValidMovesPlayer1Checker (location, board) {
  let validMoves = []
  let topLeft = [location[0]-1,location[1]-1]
  let topRight = [location[0] -1,location[1] + 1]

 function checkImmediatelyAdjacent (startingLocation, possibleAdjacent, board) {

  
  try {
    if (board[possibleAdjacent[0]][possibleAdjacent[1]] === 0) {
      let newBoard = [...board]
      newBoard[possibleAdjacent[0]][possibleAdjacent[1]] = 1
      newBoard[startingLocation[0]][startingLocation[1]] = 0
      let movesArray = [startingLocation, possibleAdjacent]
      validMoves.push(new Move(movesArray, newBoard))
    }
   } catch {

   }

 }

 

 checkImmediatelyAdjacent(location, topLeft, board)
 checkImmediatelyAdjacent(location, topRight, board)

 
 
 
 
 
 //console.log(validMoves)
 return validMoves
}


function getValidMoves(location, board) {
  let locationRow = location[0]
  let locationCol = location[1]  
  let valueAtLocation = board[locationRow][locationCol]

  if (valueAtLocation === 1) return getValidMovesPlayer1Checker(location,board)
} 


getValidMoves([5,2],board)

