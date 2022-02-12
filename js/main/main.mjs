
/*-------------------------------- Imports --------------------------------*/

import * as viewImport from "../view/view.mjs";
import * as PlayerImport from "../model/player.mjs"
import * as ModelImport from '../model/model.mjs'

/*-------------------------------- Constants --------------------------------*/

const Model = new ModelImport.Model(ModelImport.board)

/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/


/*----------------------------- Event Listeners -----------------------------*/

/*-------------------------------- Classes --------------------------------*/

/*-------------------------------- Functions --------------------------------*/


function initGame() {
  viewImport.createBoardDisplay(viewImport.boardDisplay)
}

function main() {
  initGame()
}

main()
