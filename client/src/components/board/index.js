import React, { Component } from 'react';

import { gameStates } from '../../utils/enums';

import MenuBoard from '../boards/menuBoard';
import WaitingBoard from '../boards/waitingBoard';
import IntroBoard from '../boards/introBoard';
import GameBoard from '../boards/gameBoard';
import EndBoard from '../boards/endBoard';

import './board.css';

class Board extends Component {
  render() {
    const board = this.getBoard();

    return (
      <div className="gameboard">
        {board}
      </div>
    );
  }

  getBoard() {
    switch(this.props.game.gameState) {
      case gameStates.menu:
        return <MenuBoard selection={this.props.game.selection} />
      case gameStates.waiting:
        return <WaitingBoard dispatch={this.props.dispatch} dots={this.props.game.waitingDots} />
      case gameStates.intro:
        return <IntroBoard countdown={this.props.game.countdown} />
      case gameStates.playing:
        return <GameBoard players={this.props.game.data.players} walls={this.props.game.data.walls} />
      case gameStates.completed:
        return <EndBoard winners={this.props.game.data.winners} />
      default:
        return null;
    }
  }
}

export default Board;
