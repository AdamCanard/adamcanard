import { useContext } from "react";
import { ScreenContext } from "./gamecontainer";

export default function ActionButtons() {
  const { screenControls } = useContext(ScreenContext);
  return (
    <div className={"w-20 h-20 grid grid-cols-2 grid-rows-2 "}>
      {" "}
      <button
        className={"col-start-1 row-start-1 ControllerButton"}
        onClick={() => screenControls.a}
      >
        A
      </button>
      <button
        className={"col-start-2 row-start-2 ControllerButton"}
        onClick={() => screenControls.b}
      >
        B
      </button>
    </div>
  );
}
