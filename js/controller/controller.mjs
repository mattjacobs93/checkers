import {model} from "../main/main.mjs"
import {getValidMoves,Move} from "./validator.mjs"
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





processClick(id,location) {

  


  //take away all valid moves currently displayed on board
  (() => {
    this.#view.renderValidMovesToBoard([])
  })() 

  console.log(this.#activePlayer.getActivePlayer())


  //console.log('hi click', location)
  let board = this.getBoardCopy()

  //console.log(validMovesDestinations)
  let locationValue = board[location[0]][location[1]]

  //console.log(this.#validMovesDestinations.filter(el=>console.log(el[0])))


  if (this.#activePlayer.tileBelongsToPlayer(locationValue)) {
    this.#from = location
    this.#validMoves = getValidMoves(location,board)
    //console.log('yayaay',this.#validMoves[0])
    //console.log(this.#validMovesDestinations)
    //console.log(this)
    this.#validMovesDestinations = this.#validMoves.map(el=>el.movesArray[el.movesArray.length-1])
    this.#view.renderValidMovesToBoard(this.#validMoves)
  }

  else if (this.#validMovesDestinations.filter(el=>el[0]===location[0] && el[1]===location[1]).length > 0 ) {
    //console.log('valid destination')

    
    
    
    let chosenMove = this.#validMoves.filter(el=>el.movesArray[el.movesArray.length-1][0] === location[0] && el.movesArray[el.movesArray.length-1][1] === location[1])[0]

    let beginningOfMove = chosenMove.movesArray[0]
    let valueAtBeginningOfMove = board[beginningOfMove[0]][beginningOfMove[1]]

    if (this.#activePlayer.tileBelongsToPlayer(valueAtBeginningOfMove))
    {
      this.#to = location
      console.log('applying move and changing player')
      //console.log(chosenMove)
      console.log('my chosen move', chosenMove)
      console.log('chosen move value',chosenMove.board[3][4])
      this.#model.setBoard(chosenMove.board)
      this.#view.renderMove(chosenMove)
      this.#activePlayer.toggleActivePlayer()
      this.#validMoves = []
    } 
    
  } else {
    this.#from = null
    this.#validMoves = []
    this.#view.renderValidMovesToBoard(this.#validMoves)
  }

  
}
}