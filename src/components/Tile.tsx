interface Props {
    xPos: number;
    yPos: number;
    value: string | null;
}

const Tile = ({ xPos, yPos, value }: Props) => {
  return (
    <div className="tile">
      xPos: {xPos}, yPos: {yPos}, value: {value},
    </div>
  );
};

export default Tile;
