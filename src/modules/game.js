import { renderAttack } from "./dom";
import Player from "./player";

export default class Game {
  constructor() {
    this.player = new Player('player');
    this.computer = new Player('computer');
  }

  playerAttack(row, col) {
      this.computer.board.receiveAttack(row, col);
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
      alert('You win, all enemy ships are sunk!');
      return true;
    } else if (this.player.board.areAllShipsSunk()) {
      alert('You lose, all your ships are sunk!');
      return true;
    }
    return false;
  }

  handleCellClick(row, col) {
    this.playerAttack(row, col);
    console.log("Player attacked:", row, col);
    // renderAttack(row, col); // wip
    if (this.checkGameOver()) return;
    
    this.computerAttack();
    console.log("Computer attacked");
    this.checkGameOver();
  }

  resetGame() {
    // reset logic tba
  }
}