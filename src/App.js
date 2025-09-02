// Criação do elemento square que irá compor o tabuleiro
import { useState } from 'react';
import './App.css';

function Square({ valor, onSquareClick }) {
  return (
    <button className="Square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

export default function Tabuleiro() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {
    if (squares[i] || haVencedor(squares)) {
      // se já tem X ou O ou já há vencedor, não faz nada
      return;
    }

    const nextSquares = squares.slice();
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const vencedor = haVencedor(squares);
  const empate = !vencedor && squares.every(square => square !== null);

  let status;
  if (vencedor) {
    status = `O vencedor é ${vencedor}`;
  } else if (empate) {
    status = "Deu velha!";
  }

  return (
    <div>
      <div className="status">{status}</div>

      <div>
        <Square valor={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square valor={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square valor={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div>
        <Square valor={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square valor={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square valor={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div>
        <Square valor={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square valor={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square valor={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function haVencedor(squares) {
  const linhas = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of linhas) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
