// Criação do elemento square que irá compor o tabuleiro
import { useState } from 'react';
import './App.css';

function Square({valor, onSquareClick}){
  return(
    <button className="square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

export default function Tabuleiro(){
  const [squares, setSquares] = useState(Array(9).fill(null))
  function handleClick(i){
    const nextSquares = squares.slice();
    nextSquares[i] = "X";
    setSquares(nextSquares);
  }
  return(
    <div>
      <div>
        <Square valor={squares[0]} onSquareClick={() =>{handleClick(0)}}/>
        <Square valor={squares[1]} onSquareClick={() =>{handleClick(1)}}/>
        <Square valor={squares[2]} onSquareClick={() =>{handleClick(2)}}/>
      </div>
      <div>
        <Square valor={squares[3]} onSquareClick={() =>{handleClick(3)}}/>
        <Square valor={squares[4]} onSquareClick={() =>{handleClick(4)}}/>
        <Square valor={squares[5]} onSquareClick={() =>{handleClick(5)}}/>
      </div>
      <div>
        <Square valor={squares[6]} onSquareClick={() =>{handleClick(6)}}/>
        <Square valor={squares[7]} onSquareClick={() =>{handleClick(7)}}/>
        <Square valor={squares[8]} onSquareClick={() =>{handleClick(8)}}/>
      </div>
    </div>
  )
}