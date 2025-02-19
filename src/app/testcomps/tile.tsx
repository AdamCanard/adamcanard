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
    <div
      id={getColour(props.tileObj.value)}
      className={
        "flex text-center justify-center items-center flex-wrap w-8 h-8 border-2"
      }
    >
      {props.tileObj.value}
    </div>
  );
}
