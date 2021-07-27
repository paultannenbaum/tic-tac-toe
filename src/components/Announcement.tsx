import { GameStateType, PlayerType } from "./Game";
import { GAME_CLOSED, GAME_OPEN } from "./Game";
import styled from 'styled-components'

interface Props {
  gameState: GameStateType;
  currentPlayer: PlayerType;
  winningPlayer: PlayerType | null;
}

const Announcement = ({ gameState, currentPlayer, winningPlayer }: Props) => {
  const isDraw = gameState === GAME_CLOSED && !winningPlayer;
  const gameOpen = gameState === GAME_OPEN;

  return (
    <div id="announcement">
      <p>
        <b>Game Status:</b> {gameState}
      </p>

      {gameOpen && (
        <p>
          <b>Current Player:</b> {currentPlayer.name}
        </p>
      )}

      {winningPlayer && (
        <Info>
          <b>Winning Player:</b> {winningPlayer.name}
        </Info>
      )}
      {isDraw && (
        <Info>
          <b>Draw Game</b>
        </Info>
      )}
    </div>
  );
};

const Info = styled.p`
  background: lawngreen;
`


export default Announcement;
