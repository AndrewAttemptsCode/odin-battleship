import './styles.css';
import { renderBoard } from "./modules/dom";
import Game from './modules/game';

const game = new Game();

game.randomizeShips(game.player);
game.randomizeShips(game.computer);

const playerBoardElement = document.querySelector('#player-board');
const computerBoardElement = document.querySelector('#computer-board');

renderBoard(playerBoardElement, game.player.board, true);
renderBoard(computerBoardElement, game.computer.board, false, game.handleCellClick.bind(game));
