interface Props {
    xPos: number;
    yPos: number;
    value: string | null;
    onClick: () => void
}

const Tile = ({ xPos, yPos, value, onClick }: Props) => (
    <div className="tile" onClick={onClick}>{value || 'click'}</div>
  );

export default Tile;
