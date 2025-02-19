import { useContext } from "react";
import { GridContext } from "./gamecontainer";

export default function OptionButtons() {
  const { move } = useContext(GridContext);
  return (
    <div className={"flex flex-row gap-2 justify-center items-end h-full pb-2"}>
      <button className={"ControllerButton"} onClick={() => move("sel")}>
        Sel
      </button>
      <button className={"ControllerButton"} onClick={() => move("sta")}>
        Sta
      </button>
    </div>
  );
}
