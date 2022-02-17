export {CheckersPieceHolder}

class CheckersPieceHolder {
  checkersPieces
  bodyElement

  constructor (bodyElement) {
    this.checkersPieces = []
    this.bodyElement = bodyElement
  }

  makeNewPiece (currVal)  {
    let newPiece = document.createElement('div')
    let classes = []
    if (currVal < 0) classes.push('black')
    else classes.push('red')

    if (Math.abs(currVal) === 2) classes.push('king')
    else classes.push('non-king')

    classes.forEach(classToAdd=>newPiece.classList.add(classToAdd))
    this.bodyElement.appendChild(newPiece)
    return newPiece
  }

  setPiecePosition (newPiece,id,tiles) {
    
  }

}