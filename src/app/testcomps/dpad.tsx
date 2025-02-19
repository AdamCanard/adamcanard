import { useContext } from "react";
import { GridContext } from "./gamecontainer";

export default function DPad() {
  const { move } = useContext(GridContext);
  return (
    <div className={"grid grid-cols-3 grid-rows-3 w-24 h-24"}>
      {" "}
      <button
        className={"col-start-2  row-start-1 rounded-t DPad DPadButtonUp "}
        onClick={() => move("u")}
      ></button>
      <button
        className={"col-start-2 row-start-3 rounded-b DPad DPadButtonDown"}
        onClick={() => move("d")}
      ></button>
      <button className={"col-start-2 row-start-2 DPad"}></button>
      <button
        className={"col-start-1 row-start-2 rounded-l DPad DPadButtonLeft "}
        onClick={() => move("l")}
      ></button>
      <button
        className={"col-start-3 row-start-2 rounded-r DPad DPadButtonRight "}
        onClick={() => move("r")}
      ></button>
    </div>
  );
}
