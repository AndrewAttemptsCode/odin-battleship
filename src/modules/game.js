import { renderBoard } from "./dom";
import Player from "./player";

export default class Game {
  constructor() {
    this.player = new Player('player');
    this.computer = new Player('computer');
  }

  playerAttack(row, col) {
    if (this.computer.board.missedAttacks.has(`${row}, ${col}`) || this.computer.board.hitAttacks.has(`${row}, ${col}`)) {
      return false;
    }
    
    this.computer.board.receiveAttack(row, col);
    return true;
  }

  computerAttack() {
      let row, col;

      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.player.board.missedAttacks.has(`${row}, ${col}`) || this.player.board.hitAttacks.has(`${row}, ${col}`));

      this.player.board.receiveAttack(row, col);
    }
    
  checkGameOver() {
    if (this.computer.board.areAllShipsSunk()) {
      alert('You win, all enemy ships are sunk!'); // placeholders for now - change to dom element func.
      return true;
    } else if (this.player.board.areAllShipsSunk()) {
      alert('You lose, all your ships are sunk!'); // placeholders for now - change to dom element func.
      return true;
    }
    return false;
  }

  handleCellClick(row, col) {
    if (this.checkGameOver()) return;

    if (!this.playerAttack(row, col)) {
      console.log('Invalid move: cell already attacked, pick again.');
      return;
    }

    console.log("Player attacked:", row, col);

    renderBoard(document.querySelector('#player-board'), this.player.board, true);
    renderBoard(document.querySelector('#computer-board'), this.computer.board, false, this.handleCellClick.bind(this));

    if (this.checkGameOver()) return;
    
    this.computerAttack();
    console.log("Computer attacked");
    
    renderBoard(document.querySelector('#player-board'), this.player.board, true);
    renderBoard(document.querySelector('#computer-board'), this.computer.board, false, this.handleCellClick.bind(this));

    if (this.checkGameOver()) return;
  }

  resetGame() {
    // reset logic tba
  }
}