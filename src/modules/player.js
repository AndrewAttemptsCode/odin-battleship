import GameBoard from "./gameBoard";

export default class Player {
  constructor(type) {
    this.type = type;
    this.board = new GameBoard();
  }
}