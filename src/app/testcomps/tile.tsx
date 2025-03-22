import Image from "next/image";
import { ITileObject } from "./gametypes";
import Character from "../../../public/Game/Character.png";

export default function Tile(props: { tileObj: ITileObject }) {
  const getColour = (value: string) => {
    switch (value) {
      case "E":
        return "EmptyTile";
      case "W":
        return "WallTile";
      case "C":
        return "ChestTile";
      case "D":
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
