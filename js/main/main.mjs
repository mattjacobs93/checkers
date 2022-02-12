
/*-------------------------------- Imports --------------------------------*/

import * as viewImport from "../view/view.mjs";
import * as PlayerImport from "../model/player.mjs"
import * as ModelImport from '../model/model.mjs'
import * as validatorImport from "../controller/validator.mjs"

/*-------------------------------- Constants --------------------------------*/

const model = new ModelImport.Model()

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/


/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/


function initGame() {
  viewImport.createBoardDisplay(viewImport.boardDisplay,model.getGameBoard())
}

function main() {
  initGame()
}

main()
