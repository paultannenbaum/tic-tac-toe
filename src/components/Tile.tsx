import styled from 'styled-components'

interface Props {
  value: string | null;
  onClick: () => void;
}

const Tile = ({ value, onClick }: Props) => (
  <StyledTile onClick={onClick}>
    {value}
  </StyledTile>
);

const StyledTile = styled.div`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
`

export default Tile;
