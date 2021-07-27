import { useState, useEffect } from "react";
import "../styles.css";
import Announcement from "./Announcement";
import Tile from "./Tile";
import styled from 'styled-components'
import _ from "lodash";

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
    xPos: 0,
    yPos: 0,
    value: null,
  },
  {
    xPos: 0,
    yPos: 1,
    value: null,
  },
  {
    xPos: 0,
    yPos: 2,
    value: null,
  },
  {
    xPos: 1,
    yPos: 0,
    value: null,
  },
  {
    xPos: 1,
    yPos: 1,
    value: null,
  },
  {
    xPos: 1,
    yPos: 2,
    value: null,
  },
  {
    xPos: 2,
    yPos: 0,
    value: null,
  },
  {
    xPos: 2,
    yPos: 1,
    value: null,
  },
  {
    xPos: 2,
    yPos: 2,
    value: null,
  },
];
const possibleWinRoutes = [
  // Horizontals
  [
    {
      xPos: 0,
      yPos: 0,
    },
    {
      xPos: 0,
      yPos: 1,
    },
    {
      xPos: 0,
      yPos: 2,
    },
  ],
  [
    {
      xPos: 1,
      yPos: 0,
    },
    {
      xPos: 1,
      yPos: 1,
    },
    {
      xPos: 1,
      yPos: 2,
    },
  ],
  [
    {
      xPos: 2,
      yPos: 0,
    },
    {
      xPos: 2,
      yPos: 1,
    },
    {
      xPos: 2,
      yPos: 2,
    },
  ],

  // Verticals
  [
    {
      xPos: 0,
      yPos: 0,
    },
    {
      xPos: 1,
      yPos: 0,
    },
    {
      xPos: 2,
      yPos: 0,
    },
  ],
  [
    {
      xPos: 0,
      yPos: 1,
    },
    {
      xPos: 1,
      yPos: 1,
    },
    {
      xPos: 2,
      yPos: 1,
    },
  ],
  [
    {
      xPos: 0,
      yPos: 2,
    },
    {
      xPos: 1,
      yPos: 2,
    },
    {
      xPos: 2,
      yPos: 2,
    },
  ],

  // Diagonals
  [
    {
      xPos: 0,
      yPos: 0,
    },
    {
      xPos: 1,
      yPos: 1,
    },
    {
      xPos: 2,
      yPos: 2,
    },
  ],
  [
    {
      xPos: 0,
      yPos: 2,
    },
    {
      xPos: 1,
      yPos: 1,
    },
    {
      xPos: 2,
      yPos: 0,
    },
  ],
];

// Types
export type PlayerType = typeof players[0] | typeof players[1];
export type GameStateType = typeof GAME_OPEN | typeof GAME_CLOSED;
export type TileType = {
  xPos: number;
  yPos: number;
  value: string | null;
};

const Game = () => {
  const [gameState, setGameState] = useState<GameStateType>(GAME_OPEN);
  const [currentPlayer, setCurrentPlayer] = useState<PlayerType>(players[0]);
  const [winningPlayer, setWinningPlayer] = useState<PlayerType | null>(null);
  const [tiles, setTilesState] = useState<TileType[]>(startingBoardState);

  // Analyze board after each update to `tiles` state
  useEffect((): void => {
    const movePlayedBy = currentPlayer === players[0] ? players[1] : players[0];
    const winningRoute = possibleWinRoutes.find((route) => {
      const matchingRoute = _.intersectionWith(tiles, route, (t, c) => {
        const flattened = _.pick(t, ["xPos", "yPos"]);
        return _.isEqual(flattened, c);
      });
      const valueString = matchingRoute.map((t) => t.value).join("");

      return valueString === "XXX" || valueString === "OOO";
    });

    if (winningRoute) {
      setWinningPlayer(movePlayedBy);
      setGameState(GAME_CLOSED);
    }
  }, [tiles, currentPlayer]);

  const recordTilePlay = (tile: TileType): void => {
    setTilesState(
      tiles.map((t: TileType) => {
        return t === tile ? { ...t, value: currentPlayer.symbol } : t;
      })
    );
  };

  const switchPlayers = (): void => {
    const nextPlayer = currentPlayer === players[0] ? players[1] : players[0];
    setCurrentPlayer(nextPlayer);
  };

  const handleTileClick = (tile: TileType): void => {
    if (tile.value || gameState === GAME_CLOSED) {
      return;
    }

    recordTilePlay(tile);
    switchPlayers();
  };

  return (
    <Container>
      <Announcement
        gameState={gameState}
        currentPlayer={currentPlayer}
        winningPlayer={winningPlayer}
      />
      <Board>
        {tiles.map((t, i) => {
          return (
            <Tile
              xPos={t.xPos}
              yPos={t.yPos}
              value={t.value}
              key={i}
              onClick={() => handleTileClick(t)}
            />
          );
        })}
      </Board>
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 100px auto;
`

const Board = styled.div`
  
  max-width: 600px;
  max-height: 600px;
  display: flex;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  column-gap: 0;
  row-gap: 0;
  justify-items: stretch;
  align-items: stretch;
`

export default Game;
