import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = ({ value, onClick }) => (
  <button className="square" onClick={onClick}>
    {value}
  </button>
)

const Board = ({ squares, handleClick }) => {
  const renderSquare = (i) => (
    <Square
      value={squares[i]}
      onClick={() => handleClick(i)}
    />
  )

  // const status = 'Next player: X'
  return (
    <div>
      {/* <div className="status">{status}</div> */}
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
  )
}

const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(false)
  const [winner, setWinner] = useState('')

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }
    return null
  }

  const handleClick = (i) => {
    if (winner || squares[i]) return
    const nextSquares = squares.concat()
    nextSquares[i] = isXNext ? 'X' : 'O'
    setSquares(nextSquares)
    setIsXNext(!isXNext)
    setWinner(calculateWinner(nextSquares))
  }

  const status = winner ? `Winner is ${winner}` : `Next move is ${isXNext ? 'X' : 'O'}`

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={squares}
          handleClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
