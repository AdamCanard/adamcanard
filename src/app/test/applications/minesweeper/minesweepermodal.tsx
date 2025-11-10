import { useContext } from "react";
import { MinesweeperContext } from "./minesweeper";
import { DesktopWindowContext } from "../../windowcomps/desktopwindow";

export default function MinesweeperModal(props: { message: string }) {
  const { resetSize } = useContext(DesktopWindowContext);
  const { setGameState } = useContext(MinesweeperContext);
  return (
    <div
      id="border"
      className={
        "z-10 absolute w-36 h-12 left-0 right-0 top-0 bottom-0 mx-auto my-auto flex justify-center items-center"
      }
      onClick={() => {
        setGameState("starting");
        resetSize();
      }}
    >
      <div>
        <button id="button" type="submit" value="Submit">
          {props.message}
        </button>
      </div>
    </div>
  );
}
