"use client";
import { useEffect, useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function Minesweeper() {
  return (
    <DesktopWindow title="Minesweeper" width="16rem" height="24rem">
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
        return <Cell row={index} col={index2} key={row + " " + col} />;
      });
    }),
  );

  return (
    <div className={"grid grid-cols-9 grid-rows-9 w-full h-full"}>{grid}</div>
  );
}

function Cell(props: { row: number; col: number }) {
  return (
    <div>
      {props.row}
      {props.col}
    </div>
  );
}
