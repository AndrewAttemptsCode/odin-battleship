import Ship from "./ship";

export default class GameBoard {
  constructor() {
    this.grid = this.createGrid();
    this.missedAttacks = new Set();
    this.hitAttacks = new Set();
    this.ships = new Set();
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
      this.ships.add(ship);
      return true;
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
      this.ships.add(ship);
      return true;
    } 
  }

  receiveAttack(row, col) {
    const gridCell = `${row}, ${col}`;

    if (this.missedAttacks.has(gridCell) || this.hitAttacks.has(gridCell)) {
      return false;
    }

    if (this.grid[row][col] !== null) {
      const ship = this.grid[row][col];
      ship.hit();
      this.hitAttacks.add(gridCell);
      if (ship.isSunk()) {
        return true; // confirmed sunk
      }
      return true; // confirmed hit
    }
    this.missedAttacks.add(gridCell);
    return false; // confirmed miss
  }

  areAllShipsSunk() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false; // return false if not all ships sunk
      }
    }
    return true; // return true if all ships are sunk
  }
}
