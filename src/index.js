import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square = () => {
  const [value, setState] = useState('') //initial value
  const handleClick = () => {
    setState('X')
  }
  return (
    <button className="square" onClick={handleClick}>
      {value}
    </button>
  )
}

const Board = () => {
  const renderSquare = (i) => {
    return (
      <Square
        number={i}
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
