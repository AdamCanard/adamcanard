import { ITileObject } from "./gamecontainer";

export default function Tile(props: { tileObj: ITileObject }) {
  return (
    <div
      className={
        "flex text-center justify-center items-center flex-wrap w-8 h-8 border-2"
      }
    >
      {props.tileObj.value}
    </div>
  );
}
