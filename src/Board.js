import Square from "./Square";

export default function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((val, idx) => (
        <Square key={idx} value={val} onClick={() => onClick(idx)} />
      ))}
    </div>
  );
}