
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
/*-------------------------------- Exports --------------------------------*/
export {model}

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/
let boardDisplay = document.getElementById('board')
/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/


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
}

function main() {
  initGame()
}

main()
