import React, { Component } from 'react';
import { HuePicker } from 'react-color';
import classNames from 'classnames';

import { updateName, updateColor, ready } from '../../sockets';

import './info.css';

class Info extends Component {
  render() {
    const currentPlayer = this.props.currentPlayer;
    const readyButtonClasses = classNames('btn', 'btn-block', { 'btn-success': currentPlayer && !currentPlayer.ready }, { 'btn-danger': currentPlayer && currentPlayer.ready });

    function handleNameChange(e) {
      updateName(e.currentTarget.value);
    }

    function handleColorChange(color) {
      updateColor(color.hex);
    }

    function handleReadyClick(e) {
      e.preventDefault();
      ready();
    }

    return (
      <div id="info">
        { currentPlayer &&
          <form id="infoForm">
            <div className="form-group">
              <label htmlFor="name">Change your name</label>
              <input type="text"
                     className="form-control"
                     id="name"
                     placeholder={currentPlayer.name}
                     onBlur={ handleNameChange }>
              </input>
            </div>
            <div className="form-group">
              <label htmlFor="color">Change your color</label>
              <HuePicker color={ currentPlayer.color }
                          onChangeComplete={ handleColorChange }/>
            </div>
            <button id="readyButton"
                    className={readyButtonClasses}
                    onClick={ handleReadyClick }>
                    {currentPlayer.ready ? "Unready!" : "Ready!"}
            </button>
          </form>
        }
      </div>
    );
  }
}

export default Info;
