
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







function getPlayers (isAIPlayer1, isAIPlayer2,depth1=0,depth2=0) {
  const setUpPlayers = (player1,player2) => {
    player1.setOpponent(player2)
    player2.setOpponent(player1)
    return [player1,player2]
  }


  let player1  = new PlayerImport.Player(player1Value,isAIPlayer1,depth1)
  let player2 = new PlayerImport.Player(player2Value, isAIPlayer2,depth2)
  let players = setUpPlayers(player1,player2)
 // console.log(players)

  return players
}
 

function initHTMLForGame () {
  let innerDiv = document.createElement('div')
  innerDiv.id = 'board'
  innerDiv.classList.add('hoverable')
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
  //activePlayer = new PlayerImport.ActivePlayer(players[0],players[1])
  activePlayer = new PlayerImport.ActivePlayer()
  activePlayer.setPlayers(players[0],players[1])
 // console.log(activePlayer)
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
  view.renderBoard(boardAtBeginning)
  view.renderPossibleFromTiles(boardAtBeginning)
  if (activePlayer.isAI()) {
    controller.aiMove()
  }
}


//main()


function testing() {
  let title = document.createElement('p')
  title.id = 'title'
  title.textContent = 'Checkers'
  bodyElement.appendChild(title)

 // view.turnOn()
//   let tilePiece = document.createElement('div')
//   tilePiece.classList.add('checkers-piece')
//   tilePiece.classList.add('red')
//   tilePiece.classList.add('non-king')
//   bodyElement.appendChild(tilePiece)
//   //tilePiece.innerHTML = '<p>♚</p>'
//   tilePiece.innerHTML = '⬤'
//   let boundingRect = tilePiece.getBoundingClientRect()
//   let rect = tiles[0].getBoundingClientRect()
  


//   setInterval(()=>{
//     rect = tiles[0].getBoundingClientRect()
//     tilePiece.style.left = `${rect.left}px`;
//     tilePiece.style.top = `${rect.top}px`;

//   },1)

//   //tilePiece.style.left = `${rect.left}px`;
// //tilePiece.style.top = `${rect.top}px`;
//   console.log(boundingRect.top,boundingRect.right,boundingRect.bottom,boundingRect.left)
  

}


function displayMenu () {
  
  
  
  view.turnOff()
  //view.displayIntroMessage()
  let menu = document.createElement('div')
  menu.classList.add('menu')
  menu.textContent = " "
  bodyElement.append(menu)
  let rectBoard = boardDisplay.getBoundingClientRect()
  let menuWidth = parseInt(0.8 * (rectBoard.left - rectBoard.right))
  menu.style.width = '67.5vh'
  menu.style.height = '42vh'
  menu.style.position = 'relative'
  menu.style.top = '16.5vh'
  console.log('hi',rectBoard)
  let menuSign = document.createElement('p')
  menuSign.textContent = 'Starting Menu'
  menuSign.classList.add('menu-sign')
  menu.appendChild(menuSign)

  let chooseP1 = document.createElement('p')
  chooseP1.textContent = 'Player One:'
  chooseP1.classList.add('choose-player-1')
  menu.appendChild(chooseP1)



  let chooseP2 = document.createElement('p')
  chooseP2.textContent = 'Player Two:'
  chooseP2.classList.add('choose-player-2')
  menu.appendChild(chooseP2)

  let humanButton1 = document.createElement('button')
  humanButton1.classList.add('difficulty-level')
  humanButton1.classList.add('player-one')
  humanButton1.id = 'humanButton1'
  humanButton1.textContent = 'Human'
  menu.appendChild(humanButton1)

  let aiEasy1 = document.createElement('button')
  aiEasy1.classList.add('difficulty-level')
  aiEasy1.classList.add('player-one')
  aiEasy1.id = 'aiEasyButton1'
  aiEasy1.textContent = 'AI-Easy'
  menu.appendChild(aiEasy1)

  let aiMedium1 = document.createElement('button')
  aiMedium1.classList.add('difficulty-level')
  aiMedium1.classList.add('player-one')
  aiMedium1.id = 'aiMediumButton1'
  aiMedium1.textContent = 'AI-Medium'
  menu.appendChild(aiMedium1)

  let aiHard1 = document.createElement('button')
  aiHard1.classList.add('difficulty-level')
  aiHard1.classList.add('player-one')
  aiHard1.id = 'aiHardButton1'
  aiHard1.textContent = 'AI-Hard'
  menu.appendChild(aiHard1)




  let humanButton2 = document.createElement('button')
  humanButton2.classList.add('difficulty-level')
  humanButton2.classList.add('player-two')
  humanButton2.id = 'humanButton2'
  humanButton2.textContent = 'Human'
  menu.appendChild(humanButton2)

  let aiEasy2 = document.createElement('button')
  aiEasy2.classList.add('difficulty-level')
  aiEasy2.classList.add('player-two')
  aiEasy2.id = 'aiEasyButton2'
  aiEasy2.textContent = 'AI-Easy'
  menu.appendChild(aiEasy2)

  let aiMedium2 = document.createElement('button')
  aiMedium2.classList.add('difficulty-level')
  aiMedium2.classList.add('player-two')
  aiMedium2.id = 'aiMediumButton2'
  aiMedium2.textContent = 'AI-Medium'
  menu.appendChild(aiMedium2)

  let aiHard2 = document.createElement('button')
  aiHard2.classList.add('difficulty-level')
  aiHard2.classList.add('player-two')
  aiHard2.id = 'aiHardButton2'
  aiHard2.textContent = 'AI-Hard'
  menu.appendChild(aiHard2)

  let startButton = document.createElement('button')
  startButton.classList.add('startButton')
  startButton.id = 'startButton'
  startButton.textContent = 'start'
  startButton.disabled = true
  menu.appendChild(startButton) 

  let player1DifficultyChosen = false
  let player2DifficultyChosen = false

  let player1
  let player2

  const checkStartButton = () => {
    if (player1DifficultyChosen && player2DifficultyChosen) startButton.disabled = false
  }

  const clickPlayer1 = (e)=>{
    let difficultyButtons = document.querySelectorAll('.player-one')
    difficultyButtons.forEach(button=>button.classList.remove('active-button'))
    e.target.classList.add('active-button')
    player1 = e.target.id
    player1DifficultyChosen = true
    checkStartButton()
  }

  const clickPlayer2 = (e)=>{
    let difficultyButtons = document.querySelectorAll('.player-two')
    difficultyButtons.forEach(button=>button.classList.remove('active-button'))
    e.target.classList.add('active-button')
    player2 = e.target.id
    player2DifficultyChosen = true
    checkStartButton()
  }

  humanButton1.addEventListener('click', clickPlayer1)
  humanButton2.addEventListener('click',clickPlayer2)

  aiEasy1.addEventListener('click',clickPlayer1)
  aiMedium1.addEventListener('click',clickPlayer1)
  aiHard1.addEventListener('click',clickPlayer1)


  aiEasy2.addEventListener('click',clickPlayer2)
  aiMedium2.addEventListener('click',clickPlayer2)
  aiHard2.addEventListener('click',clickPlayer2)

  startButton.addEventListener('click',(e) => {
    menu.remove()
    view.turnOn()

    let isPlayer1AI = (player1 === 'humanButton1') ? false : true
    let isPlayer2AI = (player2 === 'humanButton2') ? false : true
    let depth1 = (player1 === 'aiEasyButton1') ? 1
                  : (player1 === 'aiMediumButton1') ? 3
                  : 5
    let depth2 = (player2 === 'aiEasyButton2') ? 1
                  : (player2 === 'aiMediumButton2') ? 3
                  : 5
    //(isAIPlayer1, isAIPlayer2,depth1=0,depth2=0) 
    //console.log(player1, player2)
    players = getPlayers(isPlayer1AI,isPlayer2AI,depth1,depth2)
    console.log(player1.id,player2.id)
    console.log(isPlayer1AI,isPlayer2AI,depth1,depth2)
    activePlayer.setPlayers(players[0],players[1])

    if (isPlayer1AI) setTimeout(controller.aiMove(),10)
  })

}



function main() {
  initGame()
  testing()
  displayMenu()
}


main()


