"use client";
import { Dispatch, SetStateAction, useState, createContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function Minesweeper() {
  return (
    <DesktopWindow title="Minesweeper" width="20rem" height="20rem">
      <Board rows={9} cols={9} bombs={10} />
    </DesktopWindow>
  );
}

const randomArray = (amount: number, row: number, col: number) => {
  const newArray: string[] = [];
  for (let i = 0; i < amount; i++) {
    const newRow = Math.round(Math.random() * row) + "";
    const newCol = Math.round(Math.random() * col) + "";
    const newValue = newRow + " " + newCol;
    if (!newArray.includes(newValue)) {
      newArray.push(newValue);
    } else {
      i--;
    }
  }
  return newArray;
};

interface MinesweeperContextType {
  grid: JSX.Element[][];
  setGrid: Dispatch<SetStateAction<JSX.Element[][]>>;
}

//cast empty object to contexttype
export const MinesweeperContext = createContext<MinesweeperContextType>(
  {} as MinesweeperContextType,
);

function Board(props: { rows: number; cols: number; bombs: number }) {
  const boardGen = () => {
    const bombArray = randomArray(props.bombs, props.rows, props.cols);
    const newGrid = new Array(props.rows)
      .fill(undefined)
      .map((element, index) => {
        return new Array(props.cols).fill(undefined).map((element, index2) => {
          const row = index + "";
          const col = index2 + "";
          const cellKey = row + " " + col;
          if (bombArray.includes(cellKey)) {
            return <Cell row={index} col={index2} bomb={true} key={cellKey} />;
          } else {
            return <Cell row={index} col={index2} bomb={false} key={cellKey} />;
          }
        });
      });

    return newGrid;
  };

  const [grid, setGrid] = useState<JSX.Element[][]>(boardGen);

  return (
    <div className={"grid grid-cols-9 grid-rows-9 w-full h-full"}>
      <MinesweeperContext.Provider value={{ grid, setGrid }}>
        {grid}
      </MinesweeperContext.Provider>
    </div>
  );
}

function Cell(props: { row: number; col: number; bomb: boolean }) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div
      id={open ? "cell-open" : "cell"}
      className={"flex text-center justify-center items-center flex-wrap"}
      onClick={() => setOpen(true)}
    >
      {props.bomb && "F"}
    </div>
  );
}
