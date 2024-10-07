import './styles.css';
import { renderBoard } from "./modules/dom";
import Game from './modules/game';

const game = new Game();

game.player.board.placeShip(0, 0, 5, 'vertical');
game.player.board.placeShip(0, 1, 4, 'vertical');
game.player.board.placeShip(0, 2, 3, 'vertical');
game.player.board.placeShip(0, 3, 3, 'vertical');
game.player.board.placeShip(0, 4, 2, 'vertical');

game.computer.board.placeShip(1, 0, 5, 'vertical');
game.computer.board.placeShip(1, 1, 4, 'vertical');
game.computer.board.placeShip(1, 2, 3, 'vertical');
game.computer.board.placeShip(1, 3, 3, 'vertical');
game.computer.board.placeShip(1, 4, 2, 'vertical');

const playerBoardElement = document.querySelector('#player-board');
const computerBoardElement = document.querySelector('#computer-board');

renderBoard(playerBoardElement, game.player.board, true);
renderBoard(computerBoardElement, game.computer.board, false, game.handleCellClick.bind(game));
