import { ITileObject } from "./gamecontainer";

export default function Tile(props: { tileObj: ITileObject }) {
  const getColour = (value: string) => {
    switch (value) {
      case "E":
        return "EmptyTile";
      case "P":
        return "PlayerTile";
    }
  };
  return (
    <div className={`GridTile ${getColour(props.tileObj.value)}`}>
      {props.tileObj.value}
    </div>
  );
}
