export const checkGameStatus = (board)=>{
    for (let i = 0; i < 3; i++) {
        if (
          board[i][0] !== "" &&
          board[i][0] === board[i][1] &&
          board[i][1] === board[i][2]
        ) {
          return board[i][0]; // Return the winning symbol ("X" or "O")
        }
      }
    
      // Check columns
      for (let i = 0; i < 3; i++) {
        if (
          board[0][i] !== "" &&
          board[0][i] === board[1][i] &&
          board[1][i] === board[2][i]
        ) {
          return board[0][i]; // Return the winning symbol ("X" or "O")
        }
      }
    
      // Check diagonals
      if (
        board[0][0] !== "" &&
        board[0][0] === board[1][1] &&
        board[1][1] === board[2][2]
      ) {
        return board[0][0]; // Return the winning symbol ("X" or "O")
      }
      if (
        board[0][2] !== "" &&
        board[0][2] === board[1][1] &&
        board[1][1] === board[2][0]
      ) {
        return board[0][2]; // Return the winning symbol ("X" or "O")
      }
    
      // Check for a draw
      let isDraw = true;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === "") {
            isDraw = false; // If any empty cell is found, it's not a draw
            break;
          }
        }
        if (!isDraw) {
          break;
        }
      }
      if (isDraw) {
        return "draw"; // Return "draw" if there are no empty cells left
      }
    
      // If no winner or draw, return null
      return null;
}


export const convertIndexToCoordinates = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return [row, col];
  };