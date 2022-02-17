
/*-------------------------------- Imports --------------------------------*/

import * as viewImport from "../view/view.mjs";
import * as PlayerImport from "../model/player.mjs"
import * as ModelImport from '../model/model.mjs'
import * as validatorImport from "../controller/validator.mjs"
import * as controllerImport from "../controller/controller.mjs"
// import * as checkersPieceImport from "../view/checkersPiece.mjs"

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
let boardDisplay //= document.getElementById('board')
let bodyElement = document.querySelector('body') 
let activePlayer
let players
let tiles
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
 

function initHTMLForGame () {
  let innerDiv = document.createElement('div')
  innerDiv.id = 'board'
  bodyElement.innerHTML = ''
  bodyElement.appendChild(innerDiv)
  boardDisplay = document.getElementById('board')
}

function initGame() {
  initHTMLForGame()
  view.setController(controller)
  view.setModel(model)
  model.setController(controller)
  controller.setModel(model)
  controller.setView(view)

  
  //console.log(tiles)
  
  boardDisplay.addEventListener('click', (e)=>view.acceptBoardClick(e))
  players = getPlayers(false,true)
  activePlayer = new PlayerImport.ActivePlayer(players[0],players[1])
  console.log(activePlayer)
  controller.setActivePlayer(activePlayer)
  view.setBoardDiv(boardDisplay)

  let boardAtBeginning = model.getGameBoardCopy()
 //console.log(boardAtBeginning) 
 view.setBodyElement(bodyElement)
 view.setCheckersPieceHolder()
  view.createBoardAtBeginning(boardAtBeginning)
  tiles = document.querySelectorAll("#board>div")
  tiles.forEach(tile=>tile.classList.add('tile'))
  view.addTiles(tiles)
  view.renderPossibleFromTiles(boardAtBeginning)
  if (activePlayer.isAI()) {
    controller.aiMove()
  }
}

function main() {
  initGame()
}


//main()


function testing() {
  let title = document.createElement('p')
  title.id = 'title'
  title.textContent = 'Checkers'
  bodyElement.appendChild(title)
  let tilePiece = document.createElement('div')
  tilePiece.classList.add('checkers-piece')
  tilePiece.classList.add('red')
  tilePiece.classList.add('non-king')
  bodyElement.appendChild(tilePiece)
  //tilePiece.innerHTML = '<p>♚</p>'
  tilePiece.innerHTML = '⬤'
  let boundingRect = tilePiece.getBoundingClientRect()
  let rect = tiles[0].getBoundingClientRect()
  


  setInterval(()=>{
    rect = tiles[0].getBoundingClientRect()
    tilePiece.style.left = `${rect.left}px`;
    tilePiece.style.top = `${rect.top}px`;

  },1)

  //tilePiece.style.left = `${rect.left}px`;
//tilePiece.style.top = `${rect.top}px`;
  console.log(boundingRect.top,boundingRect.right,boundingRect.bottom,boundingRect.left)
  

}


main()
testing()