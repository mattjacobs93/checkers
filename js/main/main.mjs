
/*-------------------------------- Imports --------------------------------*/

import * as viewImport from "../view/view.mjs";
import * as PlayerImport from "../model/player.mjs"
import * as ModelImport from '../model/model.mjs'
import * as validatorImport from "../controller/validator.mjs"
import * as controllerImport from "../controller/controller.mjs"


/*-------------------------------- Constants --------------------------------*/

const model = new ModelImport.Model()
const view = new viewImport.View()
const controller = new controllerImport.Controller()
const player1Value = 1
const player2Value = -1
/*-------------------------------- Exports --------------------------------*/
export {model}

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/
let boardDisplay = document.getElementById('board')
let activePlayer
let players
/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/







function getPlayers () {
  const setUpPlayers = (player1,player2) => {
    player1.setOpponent(player2)
    player2.setOpponent(player1)
    returns [player1,player2]
  }


  let player1  = new PlayerImport.Player(player1Value)
  let player2 = new PlayerImport.Player(player2Value)
  let players = setUpPlayers(player1,player2)

  return players
}
 


function initGame() {
  view.setController(controller)
  view.setModel(model)
  model.setController(controller)
  controller.setModel(model)
  controller.setView(view)
  view.createBoardDisplay(boardDisplay,model.getGameBoardCopy())
  let tiles = document.querySelectorAll("#board>div")
  console.log(tiles)
  view.addTiles(tiles)
  boardDisplay.addEventListener('click', (e)=>view.boardClicked(e))
  players = getPlayers()
  activePlayer = players[0]
}

function main() {
  initGame()
}

main()
