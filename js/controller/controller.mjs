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


  //console.log('hi click', location)
  let board = this.getBoardCopy()

  //console.log(validMovesDestinations)
  let locationValue = board[location[0]][location[1]]

  //console.log(this.#validMovesDestinations.filter(el=>console.log(el[0])))


  if (this.#activePlayer.tileBelongsToPlayer(locationValue)) {
    this.#from = location
    this.#validMoves = getValidMoves(location,board)
    console.log('yayaay',this.#validMoves[0])
    //console.log(this.#validMovesDestinations)
    //console.log(this)
    this.#validMovesDestinations = this.#validMoves.map(el=>el.movesArray[el.movesArray.length-1])
    this.#view.renderValidMovesToBoard(this.#validMoves)
  }

  else if (this.#validMovesDestinations.filter(el=>el[0]===location[0] && el[1]===location[1]).length > 0) {
    //console.log('valid destination')
    this.#to = location
    let chosenMove = this.#validMoves.filter(el=>el.movesArray[el.movesArray.length-1][0] === this.#to[0] && el.movesArray[el.movesArray.length-1][1] === this.#to[1])[0]
    //console.log(chosenMove)
    console.log(chosenMove)
    this.#view.renderMove(chosenMove)
  }

  
}
}