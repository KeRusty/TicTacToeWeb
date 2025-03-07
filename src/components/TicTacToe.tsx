import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGameDetails } from '../utils/redux/slice/game/selector';
import { updateBoard } from '../utils/redux/slice/game/slice';
import AuthService from '../api/AuthService';

const X = 'X';
const O = 'O';

type BoardState = (string | null)[];

const TicTacToe = () => {
  const gameDetail = useSelector(getGameDetails);
  const dispatch = useDispatch();

  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<string | 'Draw' | null>(null);
  const [currentMove, setCurrentMove] = useState<string>('player');

  useEffect(() => {
    if (gameDetail?.board) {
      let parsedBoard: number[];
      try {
        parsedBoard = typeof gameDetail.board === 'string' ? JSON.parse(gameDetail.board) : gameDetail.board;
      } catch (error) {
        console.error('Error parsing board:', error);
        parsedBoard = Array(9).fill(0);
      }

      if (Array.isArray(parsedBoard)) {
        const flattenedBoard = parsedBoard.flat();
        const newBoard: BoardState = flattenedBoard.map(cell => (cell === 0 ? null : cell === 1 ? X : O));

        setBoard(newBoard);
        setIsXNext(gameDetail.currentPlayer === 'x');
        setWinner(gameDetail.winner);
        setCurrentMove(gameDetail.currentPlayer === 'x' ? 'player' : 'cpu');
      }
    }
  }, [gameDetail]);

  const checkGameStatus = async (updatedBoard: BoardState) => {
    const formattedBoard = JSON.stringify([
      updatedBoard.slice(0, 3).map(cell => (cell === X ? 1 : cell === O ? 2 : 0)),
      updatedBoard.slice(3, 6).map(cell => (cell === X ? 1 : cell === O ? 2 : 0)),
      updatedBoard.slice(6, 9).map(cell => (cell === X ? 1 : cell === O ? 2 : 0)),
    ]);

    dispatch(updateBoard(formattedBoard));

    try {
      const result = await AuthService.playerMove(formattedBoard, gameDetail?.id);

      if (result.board) {
        setBoard(
          result.board.flat().map((cell: number) => (cell === 1 ? X : cell === 2 ? O : null))
        );
      }
      return result;
    } catch (error) {
      console.error('Error checking game status:', error);
      return { status: 'error' };
    }
  };

  const handleCpuMove = async () => {
    setTimeout(async () => {
      try {
        const formattedBoard = JSON.stringify([
          board.slice(0, 3).map(cell => (cell === X ? 1 : cell === O ? 2 : 0)),
          board.slice(3, 6).map(cell => (cell === X ? 1 : cell === O ? 2 : 0)),
          board.slice(6, 9).map(cell => (cell === X ? 1 : cell === O ? 2 : 0)),
        ]);

        dispatch(updateBoard(formattedBoard));

        const result = await AuthService.cpuMove(formattedBoard, gameDetail?.id);
        const { board: newBoard } = result;

        if (newBoard) {
          setBoard(
            newBoard.flat().map((cell: number) => (cell === 1 ? X : cell === 2 ? O : null))
          );
        }

        if (status !== 'ongoing') {
          setWinner(status.includes('wins') ? (status.includes('x') ? X : O) : 'Draw');
        }

        setIsXNext(true);
        setCurrentMove('player');
      } catch (error) {
        console.error('Error making CPU move:', error);
      }
    }, 500);
  };

  const handleClick = async (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? X : O;
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const gameStatus = await checkGameStatus(newBoard);
    if (gameStatus.status !== 'ongoing') {
      setWinner(gameStatus.winner);
    } else if (!isXNext) {
      handleCpuMove();
    }
    setCurrentMove(isXNext ? 'cpu' : 'player');
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
    setCurrentMove('player');
  };

  useEffect(() => {
    if (currentMove === 'cpu') {
      handleCpuMove();
    }
  }, [currentMove]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="space-x-4">
        <button
          onClick={() => setCurrentMove('cpu')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          CPU First Move
        </button>
        <button
          onClick={() => setCurrentMove('player')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Player First Move
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        {winner ? (winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`) : `Current Turn: ${currentMove}`}
      </h2>
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
