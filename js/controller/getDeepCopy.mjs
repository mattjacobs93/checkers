export {getDeepCopy}

function getDeepCopy (board) {
  return board.slice().map(el=>el.slice())
}