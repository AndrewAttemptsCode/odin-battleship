export default class GameBoard {
  constructor() {
    this.grid = this.createGrid();
  }

  createGrid() {
    const grid = [];

    for (let row = 0; row < 10; row++) {
      const rowArray = [];
      for (let col = 0; col < 10; col++) {
        rowArray.push(null);
      }
      grid.push(rowArray);
    }

    return grid;
  }
}

// Gameboards should be able to place ships at specific coordinates
// by calling the ship class.