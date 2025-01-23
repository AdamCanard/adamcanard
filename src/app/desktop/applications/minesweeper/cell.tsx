import { ICellObject } from "./minesweeperfunctions";

export default function Cell(props: {
  obj: ICellObject;
  open: (arg0: number, arg1: number) => void;
}) {
  return (
    <div
      id={props.obj.state === "open" ? "cell-open" : "cell"}
      className={"flex text-center justify-center items-center flex-wrap"}
      onClick={() => {
        props.open(props.obj.row, props.obj.col);
      }}
    >
      <>{props.obj.state == "open" && props.obj.value}</>
    </div>
  );
}
