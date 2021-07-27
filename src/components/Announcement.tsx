import { GameState, Player } from "./Game";

interface Props {
  gameState: GameState;
  currentPlayer: Player;
  winningPlayer: Player | null;
}

const Announcement = ({ gameState, currentPlayer, winningPlayer }: Props) => {
  return (
    <div id="announcement">
      <p>
        <b>Game Status:</b> {gameState}
      </p>
      <p>
        <b>Current Player:</b> {currentPlayer.name}
      </p>
      {winningPlayer && (
        <p>
          <b>Winning Player:</b> {winningPlayer.name}
        </p>
      )}
    </div>
  );
};

export default Announcement;
