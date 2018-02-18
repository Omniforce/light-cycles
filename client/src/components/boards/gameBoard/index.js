import BaseBoard from '../baseBoard';

class GameBoard extends BaseBoard {
  componentDidMount() {
    super.componentDidMount();
    this.drawScreen();
  }

  componentDidUpdate() {
    this.drawScreen();
  }

  drawScreen() {
    this.resetBoard();
    this.drawPlayers();
    this.drawWalls();
  }

  drawPlayers() {
    for(let p = 0; p < this.props.players.length; p++) {
      let player = this.props.players[p];

      let x = player.x * this.cellSize;
      let y = player.y * this.cellSize;
      this.ctx.fillStyle = player.color;
      this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    }
  }

  drawWalls() {
    for(let w = 0; w < this.props.walls.length; w++) {
      let segment = this.props.walls[w];

      let x = segment.x * this.cellSize;
      let y = segment.y * this.cellSize;
      this.ctx.fillStyle = segment.color;
      this.ctx.fillRect(x, y, this.cellSize, this.cellSize);
    }
  }
}

export default GameBoard;
