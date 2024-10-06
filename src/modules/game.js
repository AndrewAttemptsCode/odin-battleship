import Player from "./player";

export default class Game {
  constructor() {
    this.player = new Player('player');
    this.computer = new Player('computer');
    this.currentTurn = this.player;
  }

  switchTurn() {
    this.currentTurn = this.currentTurn === this.player ? this.computer : this.player;
  }

  // revisit player and computer attacks, something isn't making sense to me right now
  // in terms of logging hits and misses and attack grid placements, blahhhhhh!!
  playerAttack(row, col) {
    if (this.currentTurn === this.player) {
      const result = this.computer.board.receiveAttack(row, col);
      if (result) {
        this.switchTurn();
      }
    }
  }

  computerAttack() {
    if (this.currentTurn === this.computer) {
      let row, col;

      do {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
      } while (this.player.board.missedAttacks.has(`${row}, ${col}`) || this.player.board.hitAttacks.has(`${row}, ${col}`));

      const result = this.player.board.receiveAttack(row, col);
      if (result) {
        this.switchTurn();
      }
    }
    
  }

  checkGameOver() {
    if (this.computer.board.areAllShipsSunk()) {
      alert('You win, all enemy ships are sunk!');
      this.resetGame();
    } else if (this.player.board.areAllShipsSunk()) {
      alert('You lose, all your ships are sunk!');
      this.resetGame();
    }
  }

  resetGame() {
    // reset logic tba
  }
}