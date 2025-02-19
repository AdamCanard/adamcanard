import { useContext } from "react";
import { GridContext } from "./gamecontainer";

export default function ActionButtons() {
  const { move } = useContext(GridContext);
  return (
    <div className={"grid grid-cols-2 grid-rows-2"}>
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
