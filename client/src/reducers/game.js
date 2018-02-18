import * as types from '../constants/ActionTypes';
import { gameStates } from '../utils/enums';

const initialState = {
  gameState: gameStates.menu,
  selection: 2,
  waitingDots: 0,
  countdown: 2,
  data: {
    players: [],
    walls: [],
    winners: [],
  }
};

const game = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_SELECTION_UPDATE:
      return { ...state, gameState: gameStates.menu, selection: action.selection };
    case types.ON_WAITING:
      const dots = ((state.waitingDots + 1) % 4);
      return { ...state, gameState: gameStates.waiting, waitingDots: dots };
    case types.ON_COUNTDOWN:
      return { ...state, gameState: gameStates.intro, countdown: action.secondsLeft };
    case types.ON_GAME_UPDATE:
      return {
        ...state,
        gameState: gameStates.playing,
        data: {
          ...state.data,
          players: action.players,
          walls: action.walls
        }
      };
    case types.ON_GAME_OVER:
      return {
        ...state,
        gameState: gameStates.completed,
        data: {
          ...state.data,
          winners: action.winners
        }
      };
    default:
      return state
  }
}

export default game;
