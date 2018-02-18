import React, { Component } from 'react';
import EventListener from 'react-event-listener';

import Gameboard from '../../containers/Gameboard';
import PlayersList from '../../containers/PlayersList';
import CurrentPlayerInfo from '../../containers/CurrentPlayerInfo';

import { keyPress } from '../../sockets';

import './app.css';

class App extends Component {

  handleKeyPress(e) {
    const keys = [37, 38, 39, 40, 82, 13, 66];
    const key = e.keyCode ? e.keyCode : e.which;

    if (keys.indexOf(key) > -1) {
      keyPress(key);
    }
  }

  render() {
    return (
      <div className="App content">
        <Gameboard />
        <div className="sidebar">
          <PlayersList />
          <CurrentPlayerInfo />
        </div>
        <EventListener target="window" onKeyDown={this.handleKeyPress} />
      </div>
    );
  }
}

export default App;
