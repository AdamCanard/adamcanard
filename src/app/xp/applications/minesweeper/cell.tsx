import Image from "next/image";
import { ICellObject } from "./minesweeperfunctions";
import flag from "../../../../../public/flag.png";
import { minesweeperImages } from "./minesweeperimages";
export default function Cell(props: {
  obj: ICellObject;
  open: (arg0: number, arg1: number) => void;
  flag: (arg0: number, arg1: number) => void;
  clear: (arg0: number, arg1: number) => void;
}) {
  return (
    <div
      id={props.obj.state === "open" ? "cell-open" : "cell"}
      className={
        "flex text-center justify-center items-center flex-wrap w-8 h-8"
      }
      onClick={() => {
        {
          props.obj.state == "open" &&
            props.clear(props.obj.row, props.obj.col);
        }
        {
          props.obj.state == "closed" &&
            props.open(props.obj.row, props.obj.col);
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        props.flag(props.obj.row, props.obj.col);
      }}
    >
      <>
        {props.obj.state == "open" && (
          <>
            <Image
              src={minesweeperImages[props.obj.value as keyof object]}
              alt="MineSweeper Icon"
            />
          </>
        )}
      </>
      <>
        {props.obj.state == "flagged" && (
          <Image src={flag} alt="MineSweeper Flag" />
        )}
      </>
    </div>
  );
}
