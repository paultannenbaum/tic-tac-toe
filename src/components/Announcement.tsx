import { GameStatus, Player } from "./Game";

interface Props {
  gameStatus: GameStatus;
  currentPlayer: Player;
  winningPlayer: Player | null;
}

const Announcement = ({ gameStatus, currentPlayer, winningPlayer }: Props) => {
  return (
    <div id="announcement">
      <p>
        <b>Game Status:</b> {gameStatus}
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
