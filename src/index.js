import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
)

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(false)

  const renderSquare = (i) => {
    const handleClick = (i) => {
      const nextSquares = squares.concat()
      nextSquares[i] = isXNext ? 'X' : 'O'
      setSquares(nextSquares)
      setIsXNext(!isXNext)
    }
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
      />
    )
  }

  const status = 'Next player: X';
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
)

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
