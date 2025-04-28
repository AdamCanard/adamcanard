import { useContext } from "react";
import { ScreenContext } from "./gamecontainer";

export default function OptionButtons() {
  const { screenControls } = useContext(ScreenContext);
  return (
    <div className={"flex items-end justify-center h-full"}>
      <div className={"flex flex-row gap-4 mb-4 w-24 h-10"}>
        {" "}
        <button
          className={"ControllerButton"}
          onClick={() => screenControls.select()}
        >
          Sel
        </button>
        <button
          className={"ControllerButton"}
          onClick={() => screenControls.start()}
        >
          Sta
        </button>
      </div>
    </div>
  );
}
