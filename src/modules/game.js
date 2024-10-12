import { renderBoard, updateResultDisplay } from "./dom";
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
      updateResultDisplay('win');
      return true;
    } else if (this.player.board.areAllShipsSunk()) {
      updateResultDisplay('lose');
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

  randomizeShips(user) {
    const shipSizes = [5, 4, 3, 3, 2];
    const orientations = ['vertical', 'horizontal'];
    let row, col, orientationIndex, orientation;

    for (const shipSize of shipSizes) {
      let shipPlaced = false;

      while (!shipPlaced) {
        try {
          row = Math.floor(Math.random() * 10);
          col = Math.floor(Math.random() * 10);
          orientationIndex = Math.floor(Math.random() * 2);
          orientation = orientations[orientationIndex];
  
          shipPlaced = user.board.placeShip(row, col, shipSize, orientation);
        } catch (error) {
          shipPlaced = false;
        }
      }
    }
  }

  resetGame() {
    this.player.board.hitAttacks.clear();
    this.player.board.missedAttacks.clear();
    this.player.board.ships.clear();

    this.computer.board.hitAttacks.clear();
    this.computer.board.missedAttacks.clear();
    this.computer.board.ships.clear();

    this.player.board.grid = this.player.board.createGrid();
    this.computer.board.grid = this.computer.board.createGrid();

    const resultContainer = document.querySelector('.result-container');
    resultContainer.className = 'result-container';
    resultContainer.textContent = '';
  }
}