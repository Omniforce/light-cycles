import BaseBoard from '../baseBoard';
import { onWaiting } from '../../../actions';

class WaitingBoard extends BaseBoard {
  componentDidMount() {
    super.componentDidMount();
    this.drawScreen();
  }

  componentDidUpdate() {
    this.drawScreen();
  }

  componentWillUnmount() {
    clearInterval(this.waitingTimer);
  }

  drawScreen() {
    this.resetBoard();
    this.drawWaiting();

    if (!this.waitingTimer) {
      this.waitingTimer = setInterval(() => {
        this.dispatch(onWaiting());
      }, 1000);
    }
  }

  drawWaiting() {
    const dots = ".".repeat(this.props.dots);

    this.ctx.font = '20pt Gothic';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Waiting for enough players to be ready' + dots, this.centerX, 250);

    this.ctx.font = '15pt Gothic';
    this.ctx.fillText('Press b to return to menu', this.centerX, 330);
  }
}

export default WaitingBoard;
