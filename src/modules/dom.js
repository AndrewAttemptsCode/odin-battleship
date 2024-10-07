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
      
      boardElement.appendChild(cell);
    }
  }
}

// paint player / computer miss marker to the board
// paint player / computer hit marker to the board
// paint ship is sunk to the board
// wip
export function renderAttack(board, row, col) {
  // to do
}