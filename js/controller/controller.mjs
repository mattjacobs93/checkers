import {model} from "../main/main.mjs"
export {Controller}

//console.log(model)

class Controller {
#model
#view

setModel (model) {
  this.#model = model
}

setView (view) {
  this.#view = view
}
getBoardCopy () {
  //return 
}
}