import { ITileObject } from "./gamecontainer";

export default function Tile(props: { tileObj: ITileObject }) {
  const getColour = (value: string) => {
    switch (value) {
      case "E":
        return "EmptyTile";
      case "P":
        return "PlayerTile";
      case "W":
        return "WallTile";
      case "C":
        return "ChestTile";
    }
  };
  return <div className={`GridTile ${getColour(props.tileObj.value)}`}></div>;
}
