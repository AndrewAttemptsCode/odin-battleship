export function renderBoard(boardElement, board, isPlayerBoard, handleCellClick) {
  boardElement.innerHTML = '';

  for (let row = 0; row < board.grid.length; row++) {
    for (let col = 0; col < board.grid[row].length; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;

      if (isPlayerBoard && board.grid[row][col] !== null) {
        cell.classList.add('ship');
      }

      if (!isPlayerBoard) {
        cell.addEventListener('click', () => {
          if (handleCellClick) handleCellClick(row, col);
        });
      }

      renderAttack(cell, board, row, col);
      
      boardElement.appendChild(cell);
    }
  }
}

function renderAttack(cell, board, row, col) {
  const position = `${row}, ${col}`;

  if (board.hitAttacks.has(position)) {
    const hitMarker = document.createElement('div');
    hitMarker.classList.add('hit-marker');
    cell.appendChild(hitMarker);
    if (board.grid[row][col].isSunk()) {
      cell.classList.add('sunk');
    }
  } else if (board.missedAttacks.has(position)) {
    const missMarker = document.createElement('div');
    missMarker.classList.add('miss-marker');
    cell.appendChild(missMarker);
  }
}

export function updateResultDisplay(result) {
  const resultContainer = document.querySelector('.result-container');

  resultContainer.className = 'result-container';

  if (result === 'win') {
    resultContainer.classList.add('win-result');
    resultContainer.textContent = 'You win, all the enemy ships have been sunk!';
  } else if (result === 'lose') {
    resultContainer.classList.add('lose-result');
    resultContainer.textContent = 'You lose, all of your ships have been sunk!';
  }
}

export function renderOptions(game) {
  const optionsContainer = document.querySelector('.options-container');
  const randomize = document.createElement('button');
  randomize.classList.add('randomize');
  randomize.textContent = 'Randomize';
  optionsContainer.appendChild(randomize);

  const restartGame = document.createElement('button');
  restartGame.classList.add('restart-game');
  restartGame.textContent = 'Restart';
  optionsContainer.appendChild(restartGame);

  randomize.addEventListener('click', () => {
    resetHandler(game);
  })

  restartGame.addEventListener('click', () => {
    resetHandler(game);
  })
}

function resetHandler(game) {
  game.resetGame();

  game.randomizeShips(game.player);
  game.randomizeShips(game.computer);

  const playerBoardElement = document.querySelector('#player-board');
  const computerBoardElement = document.querySelector('#computer-board');

  renderBoard(playerBoardElement, game.player.board, true);
  renderBoard(computerBoardElement, game.computer.board, false, game.handleCellClick.bind(game));
}