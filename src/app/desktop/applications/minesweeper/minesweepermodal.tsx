import { useContext } from "react";
import { MinesweeperContext } from "./minesweeper";

export default function MinesweeperModal() {
  const { setGameState } = useContext(MinesweeperContext);
  return (
    <div
      id="border"
      className={
        "z-10 absolute w-32 h-16 left-0 right-0 top-0 bottom-0 mx-auto my-auto flex justify-center items-center"
      }
      onClick={() => {
        setGameState("starting");
      }}
    >
      <div>
        <button id="button" type="submit" value="Submit">
          Try Again?
        </button>
      </div>
    </div>
  );
}
