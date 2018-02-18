import express from 'express';
import SocketsController from './socketsController';

module.exports = (app, io) => {
  const countdownSpeed = 1000;
  const tickSpeed = 25;

  const sockets = new SocketsController(io, countdownSpeed, tickSpeed);
  sockets.setup();
}
