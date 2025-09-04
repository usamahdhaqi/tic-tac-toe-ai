// Mengecek winner
export function checkWinner(board) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // row
    [0,3,6],[1,4,7],[2,5,8], // col
    [0,4,8],[2,4,6]          // diagonal
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes(null) ? null : "Draw";
}

// Minimax Algorithm
function minimax(board, depth, isMaximizing) {
  const winner = checkWinner(board);
  if (winner === "X") return -10 + depth;
  if (winner === "O") return 10 - depth;
  if (winner === "Draw") return 0;

  if (isMaximizing) {
    let best = -Infinity;
    board.forEach((val, i) => {
      if (!val) {
        board[i] = "O";
        best = Math.max(best, minimax(board, depth+1, false));
        board[i] = null;
      }
    });
    return best;
  } else {
    let best = Infinity;
    board.forEach((val, i) => {
      if (!val) {
        board[i] = "X";
        best = Math.min(best, minimax(board, depth+1, true));
        board[i] = null;
      }
    });
    return best;
  }
}

// Pilih langkah AI sesuai difficulty
export function aiMove(board, difficulty="hard") {
  if (difficulty === "easy") {
    const empty = board.map((v,i)=> v?null:i).filter(v=>v!==null);
    return empty[Math.floor(Math.random()*empty.length)];
  }

  if (difficulty === "medium" && Math.random() > 0.5) {
    const empty = board.map((v,i)=> v?null:i).filter(v=>v!==null);
    return empty[Math.floor(Math.random()*empty.length)];
  }

  let bestScore = -Infinity, move;
  board.forEach((val, i) => {
    if (!val) {
      board[i] = "O";
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  });
  return move;
}
