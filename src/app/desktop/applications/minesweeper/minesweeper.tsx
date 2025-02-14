"use client";
import DesktopWindow from "../../sitecomps/desktopwindow";
import { randomArray } from "./minesweeperfunctions";
import Board from "./board";

export default function Minesweeper() {
  return (
    <DesktopWindow title="Minesweeper" width="20rem" height="28rem">
      <Board rows={9} cols={9} bombs={10} bombArray={randomArray(10, 9, 9)} />
    </DesktopWindow>
  );
}
