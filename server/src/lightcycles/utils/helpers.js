import { directions } from './enums';

const keyToDirection = {
  37: directions.left,
  38: directions.up,
  39: directions.right,
  40: directions.down
};

const startingPlayerStates = [
  { x: 10,  y: 60,  direction: directions.right },
  { x: 110, y: 60,  direction: directions.left },
  { x: 60,  y: 10,  direction: directions.down },
  { x: 60,  y: 110, direction: directions.up }
];

module.exports = {
  keyToDirection,
  startingPlayerStates,
};
