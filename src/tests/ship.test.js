import Ship from "../modules/ship";

describe('Ship functionality', () => {

  test('Ship length of 2', () => {
    const ship = new Ship(2);
    expect(ship.length).toBe(2);
  })

  test('Ship has no hits on creation', () => {
    const ship = new Ship(3);
    expect(ship.hits).toEqual(0);
  })

  test('Ship is hit', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBeGreaterThan(0);
  })

  test('Ship is hit 3 times', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.hits).toEqual(3);
  })

  test('Ship is sunk', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeTruthy();
  })

  test('Ship is not sunk', () => {
    const ship = new Ship(3);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBeFalsy();
  })
})
