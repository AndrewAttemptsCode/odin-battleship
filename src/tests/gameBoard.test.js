// Create a Gameboard class.

// Gameboards should be able to place ships at specific coordinates
// by calling the ship class.

// Gameboards should have a receiveAttack method that takes a pair
// of coordinates, determines whether or not the attack hit a ship 
// and then sends the ‘hit’ method to the correct ship, or records 
// the coordinates of the missed shot.

// Gameboards should keep track of missed attacks so they can 
// display them properly.

// Gameboards should be able to report whether or not all of their 
// ships have been sunk.

import GameBoard from "../modules/gameBoard";

describe('Gameboard functionality', () => {

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