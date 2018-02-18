import BaseBoard from '../baseBoard';

class EndBoard extends BaseBoard {
  componentDidMount() {
    super.componentDidMount();
    this.drawScreen();
  }

  componentDidUpdate() {
    this.drawScreen();
  }

  drawScreen() {
    this.resetBoard();

    this.drawTitle();
    this.drawWinner();
    this.drawRestartMessage();
  }

  drawTitle() {
    this.ctx.font = '50pt Gothic';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText("GAME OVER", this.centerX, 250);
  }

  drawWinner() {
    this.ctx.font = '30pt Gothic';
    if (this.props.winners.length > 0) {
      const winner = this.props.winners[0];

      this.ctx.fillStyle = winner.color;
      this.ctx.fillText(winner.name + " wins!", this.centerX, 300);
    } else {
      this.ctx.fillStyle = 'white';
      this.ctx.fillText("It's a tie!", this.centerX, 300);
    }
  }

  drawRestartMessage() {
    this.ctx.font = '15pt Gothic';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Press b to return to the menu', this.centerX, 360);
  }
}

export default EndBoard;
