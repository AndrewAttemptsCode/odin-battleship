import GameBoard from "../modules/gameBoard";
import Ship from "../modules/ship";

describe('Gameboard layout functionality', () => {

  test('Gameboard has 10x10 layout', () => {
    const board = new GameBoard();
    expect(board.grid.length).toBe(10);

    board.grid.forEach(row => {
      expect(row.length).toBe(10);
    })
  })

  test('Initialize board cells with null values', () => {
    const board = new GameBoard();
    board.grid.forEach(row => {
      row.forEach(cell => {
        expect(cell).toBeNull();
      })
    })
  })
})

describe('Gameboard placeShip method', () => {
  test('Place ship horizontally on an empty grid', () => {
    const board = new GameBoard();
    board.placeShip(2, 2, 3, 'horizontal');
    expect(board.grid[2][2]).toBeInstanceOf(Ship);
    expect(board.grid[2][3]).toBeInstanceOf(Ship);
    expect(board.grid[2][4]).toBeInstanceOf(Ship);
  })

  test('Place ship vertically on an empty grid', () => {
    const board = new GameBoard();
    board.placeShip(2, 2, 3, 'vertical');
    expect(board.grid[2][2]).toBeInstanceOf(Ship);
    expect(board.grid[3][2]).toBeInstanceOf(Ship);
    expect(board.grid[4][2]).toBeInstanceOf(Ship);
  })

  test('Throws error if ship does not fit horizontally', () => {
    const board = new GameBoard();
    expect(() => {board.placeShip(2, 8, 3, 'horizontal')})
    .toThrow('Ship does not fit horizontally');
  })

  test('Throws error if ship does not fit verically', () => {
    const board = new GameBoard();
    expect(() => {board.placeShip(9, 0, 3, 'vertical')})
    .toThrow('Ship does not fit vertically');
  })

  test('Throws error if space is already occupied', () => {
    const board = new GameBoard();
    board.placeShip(2, 2, 3, 'horizontal');
    expect(() => {board.placeShip(2, 2, 3, 'horizontal')})
    .toThrow('Space already occupied');
  })
})

describe('Gameboard receiveAttack method', () => {
  test('Registers a hit on a ship', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    const result = board.receiveAttack(3, 3);
    expect(result).toBe(true);
    const ship = board.grid[3][3];
    expect(ship.hits).toBe(1);
  })

  test('Registers a miss on an empty cell', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    expect(board.receiveAttack(3, 6)).toBe(false);
  })

  test('Marks a ship as sunk after enough hits', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    const result = board.receiveAttack(3, 5);
    const ship = board.grid[3][3];
    expect(result).toBe(true); // is a hit
    expect(ship.isSunk()).toBe(true); // is sunk
  })

  test('Handles multiple hits on the same ship', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    const ship = board.grid[3][3];
    expect(ship.hits).toBe(2);
  })

  test('Prevents hitting the same cell more than once', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 3);
    const ship = board.grid[3][3];
    expect(ship.hits).toBe(1);
  })

})

describe('Gameboard areAllShipsSunk method', () => {
  test('All ships sunk', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    board.receiveAttack(3, 5);
    expect(board.areAllShipsSunk()).toBe(true);
  })

  test('Not all ships sunk', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.placeShip(5, 5, 3, 'vertical');
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    expect(board.areAllShipsSunk()).toBe(false);
  })

  test('No ships placed', () => {
    const board = new GameBoard();
    expect(board.areAllShipsSunk()).toBe(true);
  })

  test('Multiple ships, all sunk', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.placeShip(5, 5, 3, 'vertical');
    board.receiveAttack(3, 3);
    board.receiveAttack(3, 4);
    board.receiveAttack(3, 5);
    board.receiveAttack(5, 5);
    board.receiveAttack(6, 5);
    board.receiveAttack(7, 5);
    expect(board.areAllShipsSunk()).toBe(true);
  })

  test('Missed attacks only', () => {
    const board = new GameBoard();
    board.placeShip(3, 3, 3, 'horizontal');
    board.receiveAttack(4, 4);
    board.receiveAttack(8, 2);
    board.receiveAttack(4, 2);
    expect(board.areAllShipsSunk()).toBe(false);
  })
})
