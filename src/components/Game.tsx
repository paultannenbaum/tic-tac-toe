import { useState, useEffect } from "react";
import "../styles.css";
import Announcement from "./Announcement";
import Tile from "./Tile";
import _ from 'lodash'

// Constants
export const GAME_OPEN = "open";
export const GAME_CLOSED = "closed";
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
        "xPos": 1,
        "yPos": 0,
        "value": null
    },
    {
        "xPos": 1,
        "yPos": 1,
        "value": null
    },
    {
        "xPos": 1,
        "yPos": 2,
        "value": null
    },
    {
        "xPos": 2,
        "yPos": 0,
        "value": null
    },
    {
        "xPos": 2,
        "yPos": 1,
        "value": null
    },
    {
        "xPos": 2,
        "yPos": 2,
        "value": null
    }
]
const possibleWinRoutes = [
    // Horizontals
    [
        {
            "xPos": 0,
            "yPos": 0,
        },
        {
            "xPos": 0,
            "yPos": 1,
        },
        {
            "xPos": 0,
            "yPos": 2,
        },
    ],
    [
        {
            "xPos": 1,
            "yPos": 0,
        },
        {
            "xPos": 1,
            "yPos": 1,
        },
        {
            "xPos": 1,
            "yPos": 2,
        },
    ],
    [
        {
            "xPos": 2,
            "yPos": 0,
        },
        {
            "xPos": 2,
            "yPos": 1,
        },
        {
            "xPos": 2,
            "yPos": 2,
        },
    ],

    // Verticals
    [
        {
            "xPos": 0,
            "yPos": 0,
        },
        {
            "xPos": 1,
            "yPos": 0,
        },
        {
            "xPos": 2,
            "yPos": 0,
        },
    ],
    [
        {
            "xPos": 0,
            "yPos": 1,
        },
        {
            "xPos": 1,
            "yPos": 1,
        },
        {
            "xPos": 2,
            "yPos": 1,
        },
    ],
    [
        {
            "xPos": 0,
            "yPos": 2,
        },
        {
            "xPos": 1,
            "yPos": 2,
        },
        {
            "xPos": 2,
            "yPos": 2,
        },
    ],

    // Diagonals
    [
        {
            "xPos": 0,
            "yPos": 0,
        },
        {
            "xPos": 1,
            "yPos": 1,
        },
        {
            "xPos": 2,
            "yPos": 2,
        },
    ],
    [
        {
            "xPos": 0,
            "yPos": 2,
        },
        {
            "xPos": 1,
            "yPos": 1,
        },
        {
            "xPos": 2,
            "yPos": 0,
        },
    ]
]

// Types
export type Player = typeof players[0] | typeof players[1];
export type GameState = typeof GAME_OPEN | typeof GAME_CLOSED;
export type Tile = {
  xPos: number;
  yPos: number;
  value: string | null;
};

const Game = () => {
  const [gameState, setGameState] = useState<GameState>(GAME_OPEN);
  const [currentPlayer, setCurrentPlayer] = useState<Player>(players[0]);
  const [winningPlayer, setWinningPlayer] = useState<Player | null>(null);
  const [tiles, setTilesState] = useState<Tile[]>(startingBoardState);

  // Analyze board after each update to `tiles` state
  useEffect((): void => {
      const movePlayedBy = currentPlayer === players[0] ? players[1] : players[0]
      const winningRoute = possibleWinRoutes.find((route) => {
          const matchingRoute = _.intersectionWith(tiles, route, (t, c) => {
              const flattened = _.pick(t, ['xPos', 'yPos'])
              return _.isEqual(flattened, c)
          })
          const valueString = matchingRoute.map((t) => t.value).join('')

          return valueString === "XXX" || valueString === "OOO";
      })


      if (winningRoute) {
          setWinningPlayer(movePlayedBy);
          setGameState(GAME_CLOSED);
      }
  }, [tiles])

  const recordTilePlay = (tile: Tile): void => {
    setTilesState(tiles.map((t: Tile) => {
        return t === tile
            ? {...t, value: currentPlayer.symbol}
            : t;
    }))
  }

  const switchPlayers = (): void => {
      const nextPlayer = currentPlayer === players[0] ? players[1] : players[0]
      setCurrentPlayer(nextPlayer);
  }

  const handleTileClick = (tile: Tile): void => {
    if (tile.value || gameState === GAME_CLOSED) { return }

    recordTilePlay(tile);
    switchPlayers();
  }

  return (
    <div id="container">
      <Announcement
        gameState={gameState}
        currentPlayer={currentPlayer}
        winningPlayer={winningPlayer}
      />
      <div id="board">
        {tiles.map(t => {
            return <Tile xPos={t.xPos} yPos={t.yPos} value={t.value} onClick={() => handleTileClick(t)} />
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
