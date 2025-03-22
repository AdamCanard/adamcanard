import { ITileObject } from "./gametypes";

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
      case "D":
        return "DoorTile";
    }
  };
  return <div className={`GridTile ${getColour(props.tileObj.value)}`}></div>;
}
