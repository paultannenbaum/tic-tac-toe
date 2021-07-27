import {GameState, Player} from "./Game";
import {GAME_CLOSED, GAME_OPEN} from "./Game";

interface Props {
    gameState: GameState;
    currentPlayer: Player;
    winningPlayer: Player | null;
}

const Announcement = ({gameState, currentPlayer, winningPlayer}: Props) => {
    const isDraw = gameState === GAME_CLOSED && !winningPlayer
    const gameOpen = gameState === GAME_OPEN

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
                <p>
                    <b>Winning Player:</b> {winningPlayer.name}
                </p>
            )}
            {isDraw && (
                <p>
                    <b>Draw Game</b>
                </p>
            )}
        </div>
    );
};

export default Announcement;
