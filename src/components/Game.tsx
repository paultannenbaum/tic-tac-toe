import { useState } from "react";
import "../styles.css";
import Announcement from "./Announcement";

// Constants
const GAME_OPEN = "open";
const GAME_CLOSED = "closed";

// Types
const players = [
  {
    name: "player 1",
    symbol: "X",
  },
  {
    name: "player 2",
    symbol: "O",
  },
] as const;
export type Player = typeof players[number];
const gameStates = [GAME_OPEN, GAME_CLOSED];
export type GameStatus = typeof gameStates[number];

const Game = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GAME_OPEN);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0]);
  const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);

  return (
    <div id="container">
      <Announcement
        gameStatus={gameStatus}
        currentPlayer={currentPlayer}
        winningPlayer={winningPlayer}
      />
    </div>
  );
};

export default Game;
