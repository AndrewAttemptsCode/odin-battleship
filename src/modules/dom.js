export function renderBoard(boardElement, board, isPlayerBoard) {
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
          handleAttack(row, col);
        });
      }
      
      boardElement.appendChild(cell);
    }
  }
}