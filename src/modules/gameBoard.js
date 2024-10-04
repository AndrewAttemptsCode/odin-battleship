import Ship from "./ship";

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

  placeShip(row, col, shipLength, direction){
    const ship = new Ship(shipLength);

    if (direction === 'horizontal') {
      // Check if ship fits in the grid, horizontally.
      if (col + shipLength > this.grid[row].length) {
        throw new Error('Ship does not fit horizontally');
      }

      // Check if space available
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[row][col + i] !== null) {
          throw new Error('Space already occupied');
        }
      }

      // Place the ship
      for (let i = 0; i < shipLength; i++) {
        this.grid[row][col + i] = ship;
      }
    }

    else if (direction === 'vertical') {
      // Check if ship fits in the grid, vertically.
      if (row + shipLength > this.grid.length) {
        throw new Error('Ship does not fit vertically');
      }

      // Check if space available
      for (let i = 0; i < shipLength; i++) {
        if (this.grid[row + i][col] !== null) {
          throw new Error('Space already occupied');
        }
      }

      // Place the ship
      for (let i = 0; i < shipLength; i++) {
        this.grid[row + i][col] = ship;
      }
    } 
  }

  receiveAttack(row, col) {
    if (this.grid[row][col] !== null) {
      const ship = this.grid[row][col];
      ship.hit();
      if (ship.isSunk()) {
        return true; // confirmed sunk
      }
      return true; // confirmed hit
    }
    return false; // confirmed miss
  }
}
