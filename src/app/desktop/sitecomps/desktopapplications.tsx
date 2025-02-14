"use client";
import RecyclingBin from "../applications/recyclingbin";
import Application from "./application";
import RecyclingBinImg from "../../../../public/Windows/RecyclingBin.png";
import MinesweeperImage from "../../../../public/minesweeper/MineSweeperDesktop.png";
import { useContext } from "react";
import { TaskbarContext } from "../taskbarcontext";
import Minesweeper from "../applications/minesweeper/minesweeper";

export default function DesktopApplications() {
  const { admin } = useContext(TaskbarContext);
  return (
    <div
      className={"grid w-full h-full grid-cols-12 grid-rows-7 grid-flow-col"}
    >
      <Application
        title="Recycling Bin"
        src={RecyclingBinImg}
        window={<RecyclingBin key={"Recycling Bin"} />}
      />{" "}
      {admin && (
        <Application
          title="Minesweeper"
          src={MinesweeperImage}
          window={<Minesweeper key={"Minesweeper"} />}
        />
      )}
    </div>
  );
}
