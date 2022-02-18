import { NUM_COLS, NUM_ROWS } from "../model/model.mjs"
import {getValidMoves,Move} from "./validator.mjs"
import {minmax} from "../AI/minmax.mjs"
import { gameOver } from "./gameOver.mjs"
import { getDeepCopy } from "./getDeepCopy.mjs"

export {Controller}



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
    this.#alpha = -1 * Infinity
    this.#beta = Infinity
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

    (() => {
      this.#view.renderValidMovesToBoard([])
      this.#view.cleanBoard()
      this.#view.toggleHover()
    })() 
  
    let boardCopy = this.#model.getGameBoardCopy()
    let moveObj = new Move(null,boardCopy)

    let maxDepth = this.#activePlayer.getDepth()
    let chosenMoveObj = minmax(moveObj,0,maxDepth,this.#activePlayer.getActivePlayer(), -1*Infinity, Infinity)
 
    let from = chosenMoveObj.movesArray[0]
    let fromID = this.locationToID(from)
    let to = chosenMoveObj.movesArray[chosenMoveObj.movesArray.length - 1]
    let toID = this.locationToID(to)


    this.#view.toggleHover()
    this.processClick(fromID,from)
    this.processClick(toID, to)
  }

switchPlayer() {
    this.#activePlayer.toggleActivePlayer()
    let board = this.#model.getGameBoardCopy()
    this.#view.renderActiveTile(null)
    this.#view.renderPossibleFromTiles(board)
    setTimeout(() =>
    {
      if (this.#activePlayer.isAI()) {
        this.aiMove()
      } 
    },10)
}


 moveChosen (chosenMove) {
    let boardCopy = getDeepCopy(chosenMove.board)
    this.#model.setBoard(chosenMove.board)
    this.#view.renderMove(chosenMove)
    let outcome = gameOver(boardCopy)
    if (outcome !== 0) {
     this.#view.renderGameOver(outcome)
    } else {
      this.#validMoves = []
      this.switchPlayer()
    }
  }

processClick(id,location) {
  (() => {
    this.#view.renderValidMovesToBoard([])
    this.#view.cleanBoard()
  })() 
  let board = this.getBoardCopy()
  let locationValue
  try {
    locationValue = board[location[0]][location[1]]
  } catch {
    return
  }
  if (this.#activePlayer.tileBelongsToPlayer(locationValue)) {
    this.#from = location
    this.#validMoves = getValidMoves(location,board)
    this.#validMovesDestinations = this.#validMoves.map(el=>el.movesArray[el.movesArray.length-1])
    this.#view.renderValidMovesToBoard(this.#validMoves)
    this.#view.renderActiveTile(id)
    }
  else if (this.#validMovesDestinations.filter(el=>el[0]===location[0] && el[1]===location[1]).length > 0 ) {
      try {
        let chosenMove = this.#validMoves.filter(el=>el.movesArray[el.movesArray.length-1][0] === location[0] && el.movesArray[el.movesArray.length-1][1] === location[1])[0]

        let beginningOfMove = chosenMove.movesArray[0]
        let valueAtBeginningOfMove = board[beginningOfMove[0]][beginningOfMove[1]]
  
        if (this.#activePlayer.tileBelongsToPlayer(valueAtBeginningOfMove)) {
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


