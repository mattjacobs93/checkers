import {model} from "../main/main.mjs"
import { NUM_COLS, NUM_ROWS } from "../model/model.mjs"
import {getValidMoves,Move} from "./validator.mjs"
import {minmax} from "../AI/minmax.mjs"
export {Controller}

//console.log(model)

class Controller {
#model
#view
#from
#to
#activePlayer
#validMovesDestinations
#validMoves
#alpha
#beta

  constructor () {
    this.#alpha = -1 * Infinity //-100000000
    this.#beta = Infinity //100000000
  }


setModel (model) {
  this.#model = model
}

setView (view) {
  this.#view = view
}
getBoardCopy () {
  return this.#model.getGameBoardCopy()
}

setActivePlayer(player) {
  this.#activePlayer = player
}


getLocationsOfPossibleMovesFrom (board) {
 // let possibleMovesBoard = Array(NUM_ROWS).fill(Array(NUM_COLS).fill(0))
 let possibleMovesBoard = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
]


  for (let i = 0; i < NUM_ROWS; i++) {
    for (let j = 0; j < NUM_COLS; j++) {
      //console.log(this)
     let currTileBelongsToActivePlayer = this.#activePlayer.tileBelongsToPlayer(board[i][j])
     let boardCopy = board.slice().map(el=>el.slice())
     let hasPossibleMoves = getValidMoves([i,j],boardCopy).length > 0
      if (currTileBelongsToActivePlayer && hasPossibleMoves) {
          possibleMovesBoard[i][j] = 1
      }

    }


  }

  return possibleMovesBoard
}

locationToID(location) {
  return (location[0]*NUM_COLS) + location[1]
}


aiMove () {
  //console.log('in AI Move')

  (() => {
    this.#view.renderValidMovesToBoard([])
    this.#view.cleanBoard()
    this.#view.toggleHover()
  })() 
  
  let boardCopy = this.#model.getGameBoardCopy()
 // console.log('got board copy from model', boardCopy)
  let moveObj = new Move(null,boardCopy)

  let maxDepth = 5
  let chosenMoveObj = minmax(moveObj,0,maxDepth,this.#activePlayer.getActivePlayer(), -1*Infinity, Infinity)
  //console.log('my chosen move obj',chosenMoveObj)
 
 
 
 ///// this.moveChosen(chosenMoveObj)
 console.log(chosenMoveObj)
 let from = chosenMoveObj.movesArray[0]
 let fromID = this.locationToID(from)
 let to = chosenMoveObj.movesArray[chosenMoveObj.movesArray.length - 1]
 let toID = this.locationToID(to)


 this.#view.toggleHover()
 this.processClick(fromID,from)
 this.processClick(toID, to)
}

switchPlayer() {
  
  //console.log('0000000')
  this.#activePlayer.toggleActivePlayer()
  //console.log(this.#activePlayer.isAI())
  //console.log('11111')
  let board = this.#model.getGameBoardCopy()
  //console.log('2222222222')
  //let possibleMovesFrom = this.getLocationsOfPossibleMovesFrom(board)
  this.#view.renderActiveTile(null)
  this.#view.renderPossibleFromTiles(board)
  //console.log('do I get here')
  setTimeout(() =>
  {
  if (this.#activePlayer.isAI()) {
    //console.log('switching to AI player')
    this.aiMove()
  }
},10)
}


moveChosen (chosenMove) {
  this.#model.setBoard(chosenMove.board)
  this.#view.renderMove(chosenMove)
  this.#validMoves = []
  this.switchPlayer()
}

processClick(id,location) {

  


  //take away all valid moves currently displayed on board
  (() => {
    this.#view.renderValidMovesToBoard([])
    this.#view.cleanBoard()
  })() 

  //console.log(this.#activePlayer.getActivePlayer())


  //console.log('hi click', location)
  let board = this.getBoardCopy()

  //console.log(validMovesDestinations)

  let locationValue
  try
  {
  locationValue = board[location[0]][location[1]]
  } catch {
    return
  }
  //console.log(this.#validMovesDestinations.filter(el=>console.log(el[0])))


  if (this.#activePlayer.tileBelongsToPlayer(locationValue)) {
    this.#from = location
    this.#validMoves = getValidMoves(location,board)
    //console.log('yayaay',this.#validMoves[0])
    //console.log(this.#validMovesDestinations)
    //console.log(this)
    this.#validMovesDestinations = this.#validMoves.map(el=>el.movesArray[el.movesArray.length-1])
    this.#view.renderValidMovesToBoard(this.#validMoves)
    this.#view.renderActiveTile(id)
  }

  else if (this.#validMovesDestinations.filter(el=>el[0]===location[0] && el[1]===location[1]).length > 0 ) {
    //console.log('valid destination')

    try {
      let chosenMove = this.#validMoves.filter(el=>el.movesArray[el.movesArray.length-1][0] === location[0] && el.movesArray[el.movesArray.length-1][1] === location[1])[0]

      let beginningOfMove = chosenMove.movesArray[0]
      let valueAtBeginningOfMove = board[beginningOfMove[0]][beginningOfMove[1]]
  
      if (this.#activePlayer.tileBelongsToPlayer(valueAtBeginningOfMove))
      {
        this.#to = location        
        this.moveChosen(chosenMove)
      } 
      
     else {
      this.#from = null
      this.#validMoves = []
      this.#view.renderActiveTile(null)
      this.#view.renderValidMovesToBoard(this.#validMoves)
      
    }
  

    } catch {}


  
    }

    else {
      this.#view.renderActiveTile(null)
      this.#view.renderPossibleFromTiles(board)
    }
  }
}


