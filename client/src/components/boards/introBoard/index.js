import BaseBoard from '../baseBoard';

class IntroBoard extends BaseBoard {
  componentDidMount() {
    super.componentDidMount();
    this.drawScreen();
  }

  componentDidUpdate() {
    this.drawScreen();
  }

  drawScreen() {
    this.resetBoard();

    this.ctx.font = "30px Gothic";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(this.props.countdown, this.centerX, 300);
  }
}

export default IntroBoard;
