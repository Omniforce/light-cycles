import * as types from '../constants/ActionTypes';

// ------------------------------------
// |         RECIEVED ACTIONS         |
// ------------------------------------

export const onConnect = () => ({
  type: types.ON_CONNECT,
});

export const onPlayersUpdate = (players, currentPlayer) => ({
  type: types.ON_PLAYERS_UPDATE,
  players,
  currentPlayer
});

export const onSelectionUpdate = selection => ({
  type: types.ON_SELECTION_UPDATE,
  selection
});

export const onWaiting = () => ({
  type: types.ON_WAITING,
});

export const onCountdown = (secondsLeft) => ({
  type: types.ON_COUNTDOWN,
  secondsLeft,
});

export const onGameUpdate = (players, walls) => ({
  type: types.ON_GAME_UPDATE,
  players,
  walls,
});

export const onGameOver = winners => ({
  type: types.ON_GAME_OVER,
  winners,
});

// ------------------------------------
// |           SEND ACTIONS           |
// ------------------------------------

export const updateName = name => ({
  type: types.UPDATE_NAME,
  name,
});
export const updateColor = color => ({
  type: types.UPDATE_COLOR,
  color,
});
export const ready = () => ({
  type: types.READY,
});
export const keyPress = (key) => ({
  type: types.KEY_PRESS,
  key,
});
