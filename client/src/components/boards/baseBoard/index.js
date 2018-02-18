import React, { Component } from 'react';

class BaseBoard extends Component {
  constructor(props) {
    super(props);

    this.dispatch = this.props.dispatch;
    this.width = 600;
    this.height = 600;
    this.centerX = 300;
    this.cellSize = 5;
  }

  componentDidMount() {
    const canvas = this.refs.canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.textAlign="center";
  }

  resetBoard() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  render() {
    return (
      <canvas ref="canvas" id="canvas" width={this.width} height={this.height}></canvas>
    );
  }
}

export default BaseBoard;
