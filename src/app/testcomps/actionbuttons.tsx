import { useContext } from "react";
import { GridContext } from "./grid";

export default function ActionButtons() {
  const { move } = useContext(GridContext);
  return (
    <div className={"w-20 h-20 grid grid-cols-2 grid-rows-2 "}>
      {" "}
      <button
        className={"col-start-1 row-start-1 ControllerButton"}
        onClick={() => move("a")}
      >
        A
      </button>
      <button
        className={"col-start-2 row-start-2 ControllerButton"}
        onClick={() => move("b")}
      >
        B
      </button>
    </div>
  );
}
