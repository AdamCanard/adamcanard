import { useContext } from "react";
import { ScreenContext } from "./gamecontainer";

export default function DPad() {
  const { screenControls } = useContext(ScreenContext);
  return (
    <div className={"grid grid-cols-3 grid-rows-3 w-24 h-24"}>
      {" "}
      <button
        className={"col-start-2  row-start-1 rounded-t DPad DPadButtonUp "}
        onClick={() => screenControls.up()}
      ></button>
      <button
        className={"col-start-2 row-start-3 rounded-b DPad DPadButtonDown"}
        onClick={() => screenControls.down()}
      ></button>
      <div className={"col-start-2 row-start-2 DPad"}></div>
      <button
        className={"col-start-1 row-start-2 rounded-l DPad DPadButtonLeft "}
        onClick={() => screenControls.left()}
      ></button>
      <button
        className={"col-start-3 row-start-2 rounded-r DPad DPadButtonRight "}
        onClick={() => screenControls.right()}
      ></button>
    </div>
  );
}
