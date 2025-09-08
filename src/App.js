import "./App.css";
import { useState } from "react";

// Quadrado
function Square({ valor, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {valor}
    </button>
  );
}

// Tabuleiro 3D (um nível de 3x3)
function Tabuleiro3D({ nivel, squares, xIsNext, onPlay }) {
  function handleClick(i) {
    const index = nivel * 9 + i;
    if (squares[index] || haVencedor3D(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <div className="tabuleiro">
      <div className="linha">
        <Square valor={squares[nivel * 9 + 0]} onSquareClick={() => handleClick(0)} />
        <Square valor={squares[nivel * 9 + 1]} onSquareClick={() => handleClick(1)} />
        <Square valor={squares[nivel * 9 + 2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="linha">
        <Square valor={squares[nivel * 9 + 3]} onSquareClick={() => handleClick(3)} />
        <Square valor={squares[nivel * 9 + 4]} onSquareClick={() => handleClick(4)} />
        <Square valor={squares[nivel * 9 + 5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="linha">
        <Square valor={squares[nivel * 9 + 6]} onSquareClick={() => handleClick(6)} />
        <Square valor={squares[nivel * 9 + 7]} onSquareClick={() => handleClick(7)} />
        <Square valor={squares[nivel * 9 + 8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

// Jogo principal
export default function Game() {
  const [history, setHistory] = useState([Array(27).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const vencedor = haVencedor3D(currentSquares);
  let status;
  if (vencedor) {
    status = `Vencedor: ${vencedor}`;
  } else {
    status = "Próximo a jogar: " + (xIsNext ? "X" : "O");
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Vai para o movimento #" + move;
    } else {
      description = "Vai para o início do jogo!";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <h2>{status}</h2>
        <div className="levels">
          {[0, 1, 2].map((nivel) => (
            <div key={nivel}>
              <h3>Nível {nivel + 1}</h3>
              <Tabuleiro3D
                nivel={nivel}
                squares={currentSquares}
                xIsNext={xIsNext}
                onPlay={handlePlay}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Função de verificação de vitória em 3D
function haVencedor3D(squares) {
  const lines = [];

  // --- Linhas e colunas em cada nível (como no 2D) ---
  for (let n = 0; n < 3; n++) {
    const offset = n * 9;
    // linhas
    lines.push([offset + 0, offset + 1, offset + 2]);
    lines.push([offset + 3, offset + 4, offset + 5]);
    lines.push([offset + 6, offset + 7, offset + 8]);
    // colunas
    lines.push([offset + 0, offset + 3, offset + 6]);
    lines.push([offset + 1, offset + 4, offset + 7]);
    lines.push([offset + 2, offset + 5, offset + 8]);
    // diagonais
    lines.push([offset + 0, offset + 4, offset + 8]);
    lines.push([offset + 2, offset + 4, offset + 6]);
  }

  // --- Colunas verticais entre níveis ---
  for (let i = 0; i < 9; i++) {
    lines.push([i, i + 9, i + 18]);
  }

  // --- Diagonais em pilares (mesma linha/coluna mas mudando nível) ---
  // Linhas horizontais entre níveis
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const base = row * 3 + col;
      // Diagonal em profundidade (X e Y fixos, mudando Z)
      if (row === col) {
        lines.push([base, base + 10, base + 20]); // ↘
      }
      if (row + col === 2) {
        lines.push([base, base + 8, base + 16]); // ↙
      }
    }
  }

  // --- Diagonais principais atravessando todo o cubo ---
  lines.push([0, 13, 26]);
  lines.push([2, 13, 24]);
  lines.push([6, 13, 20]);
  lines.push([8, 13, 18]);

  // Verificação final
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
