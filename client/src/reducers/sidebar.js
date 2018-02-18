import * as types from '../constants/ActionTypes';

const initialState = {
  currentPlayer: {},
  players: [],
};

const sidebar = (state = initialState, action) => {
  switch (action.type) {
    case types.ON_PLAYERS_UPDATE:
      return {
        currentPlayer: action.currentPlayer,
        players: action.players
      }
    default:
      return state
  }
}

export default sidebar;
