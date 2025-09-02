import "./App.css";
import { useState } from "react";

//Criação do elemento square que irá compor o tabuleiro
function Square({ valor, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

function Tabuleiro({xIsNext, squares, onPlay}) {

  function handleClick(i) {
    // Se squares de i é null o if não executa o return.
    if (squares[i] || haVencedor(squares)) {
      return;
    }
    // O handleClick continua a execução pois o return não
    // foi executado o squares[i] era null.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "x";
    } else {
      nextSquares[i] = "o";
    }
    onPlay(nextSquares);
  }

  const vencedor = haVencedor(squares);
  let status;
  if(vencedor){
    status = "vencedor: " + {vencedor};
  }
  else {
    status = "Proximo a jogar: " + (xIsNext ? "X" : "O");
  }
  return (
    <div>
      <div className="status">{{status}}</div>
      <div>
        <Square
          valor={squares[0]}
          onSquareClick={() => {
            handleClick(0);
          }}
        />
        <Square
          valor={squares[1]}
          onSquareClick={() => {
            handleClick(1);
          }}
        />
        <Square
          valor={squares[2]}
          onSquareClick={() => {
            handleClick(2);
          }}
        />
      </div>
      <div>
        <Square
          valor={squares[3]}
          onSquareClick={() => {
            handleClick(3);
          }}
        />
        <Square
          valor={squares[4]}
          onSquareClick={() => {
            handleClick(4);
          }}
        />
        <Square
          valor={squares[5]}
          onSquareClick={() => {
            handleClick(5);
          }}
        />
      </div>
      <div>
        <Square
          valor={squares[6]}
          onSquareClick={() => {
            handleClick(6);
          }}
        />
        <Square
          valor={squares[7]}
          onSquareClick={() => {
            handleClick(7);
          }}
        />
        <Square
          valor={squares[8]}
          onSquareClick={() => {
            handleClick(8);
          }}
        />
      </div>
    </div>
  );


}

//Implementa o game
export default function Game(){
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentMove, setCurrentMove] = useState(true);
    const [history, setHistory] = useState(Array(9).fill(null));
    const xIsnext = currentMove % 2 === 0;
}
function haVencedor(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < lines.length; index++) {
      const [a, b, c] = lines[index];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }