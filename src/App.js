import { useState } from "react";
import Board from "./Board";
import { checkWinner, aiMove } from "./AI";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([]);
  const [difficulty, setDifficulty] = useState("hard");

  const winner = checkWinner(board);

  function handleClick(i) {
    if (board[i] || winner) return;
    const newBoard = board.slice();
    newBoard[i] = "X";
    setBoard(newBoard);
    setHistory([...history, [...newBoard]]);
    setXIsNext(false);

    // AI Move
    setTimeout(() => {
      if (!checkWinner(newBoard)) {
        const move = aiMove(newBoard, difficulty);
        newBoard[move] = "O";
        setBoard([...newBoard]);
        setHistory([...history, [...newBoard]]);
        setXIsNext(true);
      }
    }, 500);
  }

  function restartGame() {
    setBoard(Array(9).fill(null));
    setHistory([]);
    setXIsNext(true);
  }

  return (
    <div className="app">
      <h1>Tic Tac Toe with AI</h1>
      <Board squares={board} onClick={handleClick} />
      <p className="status">
        {winner ? `Winner: ${winner}` : xIsNext ? "Your turn (X)" : "AI's turn (O)"}
      </p>
      <div className="controls">
        <button onClick={restartGame}>Restart</button>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <h2>Game History</h2>
      <ul className="history">
        {history.map((h, idx) => (
          <li key={idx}>Move {idx+1}: {h.join(",")}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
