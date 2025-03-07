import React, { useState } from 'react';
import api from '../api/axios';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const calculateWinner = (squares: Array<string | null>) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = async (index: number) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = calculateWinner(newBoard);
    const isDraw = !winner && newBoard.every(square => square !== null);

    if (winner || isDraw) {
      try {
        await api.post('/game/result', {
          result: winner ? (winner === 'X' ? 'win' : 'loss') : 'draw'
        });
      } catch (error) {
        console.error('Failed to save game result:', error);
      }
    }
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : board.every(square => square)
    ? 'Draw!'
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold mb-4">{status}</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((value, index) => (
          <button
            key={index}
            className="w-20 h-20 bg-white border-2 border-gray-300 rounded-lg text-4xl font-bold flex items-center justify-center hover:bg-gray-50"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;