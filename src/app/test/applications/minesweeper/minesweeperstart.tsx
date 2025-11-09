"use client";

import { useContext } from "react";
import { WindowContext } from "../../windowprovider";

export default function MinesweeperStart() {
  const { openWindow } = useContext(WindowContext);
  return (
    <div id="border" className={"flex justify-center h-full"}>
      <div>
        <button onClick={() => openWindow("Minesweeper Easy")} id="button">
          Easy
        </button>
        <button onClick={() => openWindow("Minesweeper Medium")} id="button">
          Medium
        </button>
        <button onClick={() => openWindow("Minesweeper Hard")} id="button">
          Hard
        </button>
      </div>
    </div>
  );
}
