
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







function getPlayers (isAIPlayer1, isAIPlayer2) {
  const setUpPlayers = (player1,player2) => {
    player1.setOpponent(player2)
    player2.setOpponent(player1)
    return [player1,player2]
  }


  let player1  = new PlayerImport.Player(player1Value,isAIPlayer1)
  let player2 = new PlayerImport.Player(player2Value, isAIPlayer2)
  let players = setUpPlayers(player1,player2)
  console.log(players)

  return players
}
 


function initGame() {
  view.setController(controller)
  view.setModel(model)
  model.setController(controller)
  controller.setModel(model)
  controller.setView(view)

  
  //console.log(tiles)
  
  boardDisplay.addEventListener('click', (e)=>view.acceptBoardClick(e))
  players = getPlayers(true,true)
  activePlayer = new PlayerImport.ActivePlayer(players[0],players[1])
  console.log(activePlayer)
  controller.setActivePlayer(activePlayer)
  view.setBoardDiv(boardDisplay)

  let boardAtBeginning = model.getGameBoardCopy()
 //console.log(boardAtBeginning) 
  view.createBoardAtBeginning(boardAtBeginning)
  let tiles = document.querySelectorAll("#board>div")
  view.addTiles(tiles)
  view.renderPossibleFromTiles(boardAtBeginning)
  if (activePlayer.isAI()) {
    controller.aiMove()
  }
}

function main() {
  initGame()
}

main()
