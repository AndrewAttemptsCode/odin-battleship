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