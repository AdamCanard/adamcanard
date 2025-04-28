import Image from "next/image";
import { ITileObject } from "./gametypes";
import Character from "../../../public/Game/Character.png";

export default function Tile(props: { tileObj: ITileObject }) {
  const getColour = (value: string) => {
    switch (value) {
      case "empty":
        return "EmptyTile";
      case "wall":
        return "WallTile";
      case "chest":
        return "ChestTile";
      case "door":
        return "DoorTile";
    }
  };
  return (
    <div className={`GridTile ${getColour(props.tileObj.value)}`}>
      {props.tileObj.value === "P" && (
        <Image src={Character} alt="little guys" />
      )}
    </div>
  );
}
