"use client";
import { useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function Minesweeper() {
  return (
    <DesktopWindow title="Minesweeper" width="20rem" height="20rem">
      <Board rows={9} cols={9} bombs={10} />
    </DesktopWindow>
  );
}

function Board(props: { rows: number; cols: number; bombs: number }) {
  const [grid, setGrid] = useState<JSX.Element[][]>(
    new Array(props.rows).fill(undefined).map((element, index) => {
      return new Array(props.cols).fill(undefined).map((element, index2) => {
        const row = index + "";
        const col = index2 + "";
        return (
          <Cell row={index} col={index2} bomb={false} key={row + " " + col} />
        );
      });
    }),
  );

  return (
    <div className={"grid grid-cols-9 grid-rows-9 w-full h-full"}>{grid}</div>
  );
}

function Cell(props: { row: number; col: number; bomb: boolean }) {
  return (
    <div id="cell" className={"flex text-center justify-center flex-wrap"}>
      {" "}
      {props.row}
      {props.col}
    </div>
  );
}
