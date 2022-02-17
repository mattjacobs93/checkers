import { CheckersPiece } from "./checkersPiece.mjs"
export {CheckersPieceHolder}

class CheckersPieceHolder {
  checkersPieces
  bodyElement

  constructor (bodyElement) {
    this.checkersPieces = []
    this.bodyElement = bodyElement
  }

  makeNewPiece (currVal)  {
    let newPiece = new CheckersPiece(document.createElement('div'))
    let classes = []
    if (currVal < 0) classes.push('black')
    else classes.push('red')

    if (Math.abs(currVal) === 2) classes.push('king')
    else classes.push('non-king')
    classes.push('checkers-piece')

    classes.forEach(classToAdd=>newPiece.pieceDiv.classList.add(classToAdd))
    this.bodyElement.appendChild(newPiece.pieceDiv)
    this.checkersPieces.push(newPiece)
    return newPiece
  }

  setPiecePosition (newPiece,id,tiles) {
    //console.log('hello there')
    let currTile = tiles[id]
    //console.log('current tile',currTile)
    let rect = currTile.getBoundingClientRect()
    newPiece.pieceDiv.style.left = `${rect.left}px`
    newPiece.pieceDiv.style.top = `${rect.top}px`
    newPiece.setCurrTile(currTile)

    //console.log('hi',rect)
  }

  emptyCheckersPiecesList () {

    this.checkersPieces.forEach(piece=>piece.pieceDiv.remove())
    this.checkersPieces = []
  }

}