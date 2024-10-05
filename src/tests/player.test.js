import GameBoard from "../modules/gameBoard";
import Player from "../modules/player";

describe('Player functionality', () => {
  test('Player has gameboard', () => {
    const player = new Player('real');
    expect(player.board).toBeInstanceOf(GameBoard);
  })

  test('Player type correctly assigned', () => {
    const realPlayer = new Player('real');
    const computerPlayer = new Player('computer');
    expect(realPlayer.type).toBe('real');
    expect(computerPlayer.type).toBe('computer');
  })

  test('Opponent receives attacking hit on gameboard', () => {
    const opponent = new Player('real');

    opponent.board.placeShip(3, 3, 3, 'horizontal');
    opponent.board.receiveAttack(3, 3);

    expect(opponent.board.hitAttacks.has('3, 3')).toBe(true);
  })
})