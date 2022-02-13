
export {getValidMoves,Move}

let board =  [
  [0,-1,0,-1,0,-1,0,-1],
  [-1,0,-1,0,-1,0,-1,0],
  [0,-1,0,-1,0,-1,0,-1],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [1,0,1,0,1,0,1,0],
  [0,1,0,1,0,1,0,1],
  [1,0,1,0,1,0,1,0],
];

//console.log('board after init: ' ,board[2])
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
  //console.log('starting board get valid moves', board[7])
  //let validMovesObj = new ValidMoves()
  let validMoves = []
  // let topLeft = [location[0]-1,location[1]-1]
  // let topRight = [location[0] -1,location[1] + 1]
  // let bottomLeft = [location[0]-1,location[1]-1]
  // let bottomRight = [location[0] -1,location[1] + 1]
  //let skipRight = [location[0] - 2, location[1] + 2]
  //let skipLeft = [location[0] - 2, location[1] - 2]


 function checkImmediatelyAdjacent (startingLocation, possibleAdjacent, board, validMoves) {
  //console.log('beginning of check immediately adjacent' ,board[2][1])
  
  try {
    if (board[possibleAdjacent[0]][possibleAdjacent[1]] === 0) {
      let newBoard = board.slice().map(el=>el.slice())
      //console.log(newBoard == board)
      //console.log('new board',newBoard[2][1])
      //newBoard[2][1] = 1000
      //console.log(board[2][1])
      newBoard[possibleAdjacent[0]][possibleAdjacent[1]] = 1;
      newBoard[startingLocation[0]][startingLocation[1]] = 0;
      let movesArray = [startingLocation, possibleAdjacent]
      let newMove = new Move(movesArray, newBoard)
      newMove.movesArray = newMove.movesArray[0]
      validMoves.push(newMove)
     // console.log('end of check immediately adjacent', board[2][1])

    }
   } catch {

   }

 }

 let pieceValue = board[location[0]][location[1]]

  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {

      if (Math.abs(pieceValue) > 1 || (pieceValue === 1 && i === -1) || (pieceValue === -1 && i === 1)) {
        let possibleAdjacent = [location[0] + i, location[1] + j]
       // console.log('hello' ,board[2][1])
        checkImmediatelyAdjacent(location, possibleAdjacent, board, validMoves)
      }

    }
  }


 //checkImmediatelyAdjacent(location, topLeft, board)
 //checkImmediatelyAdjacent(location, topRight, board)

 function skip(location, board, validMoves, numMoves, moveObj) {
   //if numMoves = 0, don't add self to validMoves,
  //increment numMoves by 1 after each iteration
  //basically just don't add the starting position

  if (numMoves > 0) {
    moveObj.movesArray.push(location)
    validMoves.push(moveObj) 
  }

  let pieceValue = board[location[0]][location[1]] 
  //console.log('starting skip values',location[0],location[1], pieceValue)
  

  for (let i = -2; i <= 2; i += 4) {
    for (let j = -2; j <= 2; j += 4) {
      if (pieceValue === 1 && i === 2) continue
      if (pieceValue === -1 && i === -2) continue
     // if (numMoves > 0) 
      
      try {
            let adjacentLocation = [location[0] + parseInt(i/2), location[1] + parseInt(j/2)]
            //console.log(adjacentLocation)
            let adjacentValue = board[adjacentLocation[0]][adjacentLocation[1]]
            let skipLocation = [location[0] + i, location[1] + j]
            let skipLocationIsEmpty = (board[skipLocation[0]][skipLocation[1]] === 0) ? true : false
           // let skipValue = board[skipLocation[0]][skipLocation[1]]
            let adjacentIsOpponent = ((pieceValue > 0 && adjacentValue < 0) || (pieceValue < 0 && adjacentValue > 0)) ? true : false
            //console.log(skipLocationIsEmpty, adjacentIsOpponent, pieceValue, adjacentValue)

            if (skipLocationIsEmpty && adjacentIsOpponent) {
              let boardCopy = [...board]
              boardCopy[location[0]][location[1]] = 0
              boardCopy[skipLocation[0]][skipLocation[1]] = pieceValue
              boardCopy[adjacentLocation[0]][adjacentLocation[1]] = 0
              let moveObjCopy = moveObj.copy()
              console.log('about to recursively skip')
              skip(skipLocation,boardCopy,validMoves,numMoves+1,moveObjCopy)
            }

        }

        catch {

        }


    }
  }

 }
 
 //console.log(board[2][1])
 skip(location,board,validMoves,0,new Move(location,[...board]))
 
 //console.log(validMoves)
 //console.log('hi there',validMoves[0].board)
 return validMoves
}

// console.log(board[2][1])
// let validMovesArray = getValidMoves([2,1],board)
// console.log(validMovesArray)

