import { onPlayersUpdate, onSelectionUpdate, onWaiting, onCountdown, onGameUpdate, onGameOver } from '../actions';

import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4001');

export const setupSocket = (store) => {
  socket.on('connect', () => { console.log("Connected!"); });

  socket.on('updatePlayers', (data) => {
    const { players, currentPlayer } = JSON.parse(data);
    store.dispatch(onPlayersUpdate(players, currentPlayer));
  });

  socket.on('updateSelection', (data) => {
    const selection = JSON.parse(data);
    store.dispatch(onSelectionUpdate(selection));
  });

  socket.on('waiting', () => {
    store.dispatch(onWaiting());
  });

  socket.on('countdown', (data) => {
    const secondsLeft = JSON.parse(data);
    store.dispatch(onCountdown(secondsLeft));
  });

  socket.on('updateGame', (data) => {
    const { players, walls } = JSON.parse(data);
    store.dispatch(onGameUpdate(players, walls));
  });

  socket.on('gameOver', (data) => {
    const winners = JSON.parse(data);
    store.dispatch(onGameOver(winners));
  });
};

const updateName = (name) => { socket.emit('updateName', name); };
const updateColor = (color) => { socket.emit('updateColor', color); };
const ready = () => { socket.emit('ready'); };
const keyPress = (key) => { socket.emit('keyPress', key); };

export { updateName, updateColor, ready, keyPress };
