import uuidV4 from 'uuid/v4';
import Moniker from 'moniker';
import randomColor from 'random-color';

import { directions } from './utils/enums';

class Player {
  constructor() {
    this.uuid = uuidV4();
    this.name = Moniker.choose();
    this.color = randomColor(0.99, 0.99).hexString();

    this.ready = false;
    this.alive = false;
  }

  isReady() {
    return this.ready;
  }

  isAlive() {
    return this.alive;
  }

  reset(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.previousDirection = direction;
    this.alive = true;
  }

  move(walls) {
    walls.push({ playerId: this.uuid, x: this.x, y: this.y, color: this.color });
    this.previousDirection = this.direction;

    switch(this.direction) {
      case directions.up:
        this.y -= 1;
        break;
      case directions.left:
        this.x -= 1;
        break;
      case directions.down:
        this.y += 1;
        break;
      default: // right
        this.x += 1;
        break;
    }
  }

  isTouchingPlayer(player) {
    return (this.x == player.x && this.y == player.y);
  }

  hasHitWall(walls) {
    return walls.reduce((acc, segment) => {
      return acc || (this.x == segment.x && this.y == segment.y);
    }, false);
  }

  hasLeftBoundries(boundX, boundY) {
    return (this.x < 0) || (this.x >= boundX) || (this.y < 0) || (this.y >= boundY);
  }
}

export default Player;
