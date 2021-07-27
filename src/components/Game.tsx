import { useState } from "react";
import "../styles.css";
import Announcement from "./Announcement";
import Tile from "./Tile";

// Constants
const GAME_OPEN = "open";
const GAME_CLOSED = "closed";
const PLAYER_1_NAME = "player 1";
const PLAYER_2_NAME = "player 2";
const PLAYER_1_SYMBOL = "X";
const PLAYER_2_SYMBOL = "O";

// Game variables
const players = [
  {
    name: PLAYER_1_NAME,
    symbol: PLAYER_1_SYMBOL,
  },
  {
    name: PLAYER_2_NAME,
    symbol: PLAYER_2_SYMBOL,
  },
];
const startingBoardState = [
    {
        "xPos": 0,
        "yPos": 0,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 1,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 2,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 0,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 1,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 2,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 0,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 1,
        "value": null
    },
    {
        "xPos": 0,
        "yPos": 2,
        "value": null
    }
]

// Types
export type Player = typeof players[0] | typeof players[1];
export type GameState = typeof GAME_OPEN | typeof GAME_CLOSED;
export type TileState = {
  xPos: number;
  yPos: number;
  value: typeof PLAYER_1_SYMBOL | typeof PLAYER_2_SYMBOL | null;
};

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(GAME_OPEN);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0]);
  const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);
  const [tiles, setTilesState] = useState<TileState[]>(startingBoardState);

  const handleCompletedGame = (winningPlayer: Player): void => {
    setWinningPlayer(winningPlayer);
    setGameState(GAME_CLOSED);
  };

  return (
    <div id="container">
      <Announcement
        gameState={gameState}
        currentPlayer={currentPlayer}
        winningPlayer={winningPlayer}
      />
      <div id="board">
        {tiles.map(t => {
            return <Tile xPos={t.xPos} yPos={t.yPos} value={t.value} />
        })}
      </div>
    </div>
  );
};

export default Game;


// const startingBoardState = Array(9)
//   .fill(null)
//   .map((x, i) => {
//     // TODO: Find a better algo for setting xPos
//     let xPos;
//     if (x < 3) {
//       xPos = 0;
//     }
//     if (x >= 3 && x < 6) {
//       xPos = 1;
//     }
//     if (x > 6) {
//       xPos = 2;
//     }
//
//     return {
//       xPos: xPos,
//       yPos: i % 3,
//       value: x,
//     };
//   });
