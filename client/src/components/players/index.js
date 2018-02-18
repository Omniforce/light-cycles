import React, { Component } from 'react';
import classNames from 'classnames';

import './players.css';

class Players extends Component {
  render() {
    const playersList = this.props.players.map((player, index) => {
      let classes = classNames('ready-indicator', 'pull-left', { ready: player.ready });
      let playerStyle = { color: player.color };

      return <li key={index} className="list-group-item">
        <div className={classes}></div>
        <div style={playerStyle}>{player.name}</div>
      </li>
    });

    return (
      <div id="players">
        <h4 className="bold"><strong>Players</strong></h4>
        <ul className="list-group" id="playersList">
          {playersList}
        </ul>
      </div>
    );
  }
}

export default Players;
