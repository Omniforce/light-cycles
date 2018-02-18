import BaseBoard from '../baseBoard';

class MenuBoard extends BaseBoard {
  componentDidMount() {
    super.componentDidMount();
    this.drawScreen();
  }

  componentDidUpdate() {
    this.drawScreen();
  }

  drawScreen() {
    this.resetBoard();
    this.drawSelectionScreen();
    this.drawSelectionArrow();
  }

  drawSelectionScreen() {
    this.ctx.font = '50pt Gothic';
    this.ctx.fillStyle = '#18CAE6';
    this.ctx.fillText("LIGHTCYCLES", this.centerX, 250)

    this.ctx.font = '30pt Gothic';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Select Number of Players', 300, 300);

    this.ctx.font = '15pt Gotchic';
    this.ctx.fillText('2 players', this.centerX, 340);
    this.ctx.fillText('3 players', this.centerX, 370);
    this.ctx.fillText('4 players', this.centerX, 400);
  }

  drawSelectionArrow() {
    const y = 280 + (this.props.selection * 30);

    this.ctx.beginPath();
    this.ctx.moveTo(250, y-5);
    this.ctx.lineTo(240, y-15);
    this.ctx.lineTo(240, y+5);
    this.ctx.fillStyle = 'white';
    this.ctx.fill();
  }
}

export default MenuBoard;
