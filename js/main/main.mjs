
/*-------------------------------- Imports --------------------------------*/

import * as viewImport from "../view/view.mjs";
import * as playerImport from "../model/player.mjs"
import * as modelImport from '../model/model.mjs'
import * as controllerImport from "../controller/controller.mjs"


/*-------------------------------- Constants --------------------------------*/

const model = new modelImport.Model()
const view = new viewImport.View()
const controller = new controllerImport.Controller()
const player1Value = 1
const player2Value = -1

/*-------------------------------- Exports --------------------------------*/
export {model}

/*---------------------------- Variables (state) ----------------------------*/
let boardDisplay 
let activePlayer
let players
let tiles
/*------------------------ Cached Element References ------------------------*/

let bodyElement = document.querySelector('body') 

/*-------------------------------- Functions --------------------------------*/

function getPlayers (isAIPlayer1, isAIPlayer2,depth1=0,depth2=0) {
  const setUpPlayers = (player1,player2) => {
    player1.setOpponent(player2)
    player2.setOpponent(player1)
    return [player1,player2]
  }

  let player1  = new playerImport.Player(player1Value,isAIPlayer1,depth1)
  let player2 = new playerImport.Player(player2Value, isAIPlayer2,depth2)
  let players = setUpPlayers(player1,player2)

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
  boardDisplay.addEventListener('click', (e)=>view.acceptBoardClick(e))
  players = getPlayers(false,true)
  activePlayer = new playerImport.ActivePlayer()
  activePlayer.setPlayers(players[0],players[1])
  controller.setActivePlayer(activePlayer)
  view.setBoardDiv(boardDisplay)
  let boardAtBeginning = model.getGameBoardCopy() 
  view.setBodyElement(bodyElement)
  view.createBoardAtBeginning(boardAtBeginning)
  tiles = document.querySelectorAll("#board>div")
  tiles.forEach(tile=>tile.classList.add('tile'))
  view.addTiles(tiles)
  view.renderBoard(boardAtBeginning)
  view.renderPossibleFromTiles(boardAtBeginning)
  let title = document.createElement('p')
  title.id = 'title'
  title.textContent = 'Checkers'
  bodyElement.appendChild(title)
  view.turnOff()
  let menu = document.createElement('div')
  menu.classList.add('menu')
  menu.textContent = " "
  bodyElement.append(menu)
  menu.style.width = '67.5vh'
  menu.style.height = '42vh'
  menu.style.position = 'relative'
  menu.style.top = '16.5vh'
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
  humanButton1.id = 'human-button-1'
  humanButton1.textContent = 'Human'
  menu.appendChild(humanButton1)

  let aiEasy1 = document.createElement('button')
  aiEasy1.classList.add('difficulty-level')
  aiEasy1.classList.add('player-one')
  aiEasy1.id = 'ai-easy-button-1'
  aiEasy1.textContent = 'AI-Easy'
  menu.appendChild(aiEasy1)

  let aiMedium1 = document.createElement('button')
  aiMedium1.classList.add('difficulty-level')
  aiMedium1.classList.add('player-one')
  aiMedium1.id = 'ai-medium-button-1'
  aiMedium1.textContent = 'AI-Medium'
  menu.appendChild(aiMedium1)

  let aiHard1 = document.createElement('button')
  aiHard1.classList.add('difficulty-level')
  aiHard1.classList.add('player-one')
  aiHard1.id = 'ai-hard-button-1'
  aiHard1.textContent = 'AI-Hard'
  menu.appendChild(aiHard1)

  let humanButton2 = document.createElement('button')
  humanButton2.classList.add('difficulty-level')
  humanButton2.classList.add('player-two')
  humanButton2.id = 'human-button-2'
  humanButton2.textContent = 'Human'
  menu.appendChild(humanButton2)

  let aiEasy2 = document.createElement('button')
  aiEasy2.classList.add('difficulty-level')
  aiEasy2.classList.add('player-two')
  aiEasy2.id = 'ai-easy-button-2'
  aiEasy2.textContent = 'AI-Easy'
  menu.appendChild(aiEasy2)

  let aiMedium2 = document.createElement('button')
  aiMedium2.classList.add('difficulty-level')
  aiMedium2.classList.add('player-two')
  aiMedium2.id = 'ai-medium-button-2'
  aiMedium2.textContent = 'AI-Medium'
  menu.appendChild(aiMedium2)

  let aiHard2 = document.createElement('button')
  aiHard2.classList.add('difficulty-level')
  aiHard2.classList.add('player-two')
  aiHard2.id = 'ai-hard-button-2'
  aiHard2.textContent = 'AI-Hard'
  menu.appendChild(aiHard2)

  let startButton = document.createElement('button')
  startButton.classList.add('startButton')
  startButton.id = 'start-button'
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

    let isPlayer1AI = (player1 === 'human-button-1') ? false : true
    let isPlayer2AI = (player2 === 'human-button-2') ? false : true
    let depth1 = (player1 === 'ai-easy-button-1') ? 1
                  : (player1 === 'ai-medium-button-1') ? 3
                  : 5
    let depth2 = (player2 === 'ai-easy-button-2') ? 1
                  : (player2 === 'ai-medium-utton-2') ? 3
                  : 5
  
    players = getPlayers(isPlayer1AI,isPlayer2AI,depth1,depth2)

    activePlayer.setPlayers(players[0],players[1])

    if (isPlayer1AI) setTimeout(function(){controller.aiMove()},10)
  })
}

initGame()



