import './styles.css';
import { renderBoard } from "./modules/dom";
import Player from "./modules/player";

const player = new Player('player');
const computer = new Player('computer');

player.board.placeShip(0, 0, 5, 'vertical');
player.board.placeShip(0, 1, 4, 'vertical');
player.board.placeShip(0, 2, 3, 'vertical');
player.board.placeShip(0, 3, 3, 'vertical');
player.board.placeShip(0, 4, 2, 'vertical');

computer.board.placeShip(1, 0, 5, 'vertical');
computer.board.placeShip(1, 1, 4, 'vertical');
computer.board.placeShip(1, 2, 3, 'vertical');
computer.board.placeShip(1, 3, 3, 'vertical');
computer.board.placeShip(1, 4, 2, 'vertical');

const playerBoardElement = document.querySelector('#player-board');
const computerBoardElement = document.querySelector('#computer-board');

renderBoard(playerBoardElement, player.board, true);
renderBoard(computerBoardElement, computer.board, false);