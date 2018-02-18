import { combineReducers } from "redux"
import game from "./game"
import sidebar from "./sidebar"

const lightcycles = combineReducers({
  game,
  sidebar
});

export default lightcycles
