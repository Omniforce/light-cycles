import Enum from 'enum';

const gameStates = new Enum(['menu', 'waiting', 'intro', 'playing', 'completed']);
const directions = new Enum(['up', 'down', 'left', 'right']);

module.exports = {
  gameStates,
  directions,
};
