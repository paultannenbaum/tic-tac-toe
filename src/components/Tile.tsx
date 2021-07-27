import styled from 'styled-components'

interface Props {
  xPos: number;
  yPos: number;
  value: string | null;
  onClick: () => void;
}

const Tile = ({ xPos, yPos, value, onClick }: Props) => (
  <StyledTile onClick={onClick}>
    {value}
  </StyledTile>
);

const StyledTile = styled.div`
  border: 1px solid black;
  min-height: 200px;
  display: flex;
  justify-items: center;
  align-items: center;
  align-content: center;
`

export default Tile;
