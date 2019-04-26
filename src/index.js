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

  return (
    <div>
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
  const [isXNext, setIsXNext] = useState(true)
  const [winner, setWinner] = useState('')
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }])

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

    const nextHistory = history.concat({ squares: nextSquares })
    setHistory(nextHistory)
  }

  const jumpTo = (squares, index) => {
    const { squares: current } = squares
    setSquares(current)
    setIsXNext(index % 2 === 0)
    const nextHistory = history.slice(0, index + 1)
    setHistory(nextHistory)
    setWinner(calculateWinner(current))
  }


  const status = winner ? `Winner is ${winner}` : `Next player is ${isXNext ? 'X' : 'O'}`

  const moves = history.map((squares, index) => {
    const desc = index ?
      'Go to move #' + index :
      'Go to game start'
    return (<li key={index}>
      <button onClick={() => jumpTo(squares, index)}>{desc}</button>
    </li>)
  })

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
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)
