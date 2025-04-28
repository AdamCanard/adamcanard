import { useContext } from "react";
import { GridContext } from "./grid";

export default function OptionButtons() {
  const { move } = useContext(GridContext);
  return (
    <div className={"flex items-end justify-center h-full"}>
      <div className={"flex flex-row gap-4 mb-4 w-24 h-10"}>
        {" "}
        <button className={"ControllerButton"} onClick={() => move("sel")}>
          Sel
        </button>
        <button className={"ControllerButton"} onClick={() => move("sta")}>
          Sta
        </button>
      </div>
    </div>
  );
}
