"use client";
import {
  Dispatch,
  SetStateAction,
  useState,
  createContext,
  useContext,
} from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import { create } from "domain";

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
    const newRow = Math.floor(Math.random() * row) + "";
    const newCol = Math.floor(Math.random() * col) + "";
    const newValue = newRow + " " + newCol;
    if (!newArray.includes(newValue)) {
      newArray.push(newValue);
    } else {
      i--;
    }
  }
  return newArray;
};

const boardGen = (rows: number, cols: number, bombs: string[]) => {
  const newGrid = new Array(rows).fill(undefined).map((element, index) => {
    return new Array(cols).fill(undefined).map((element, index2) => {
      const row = index + "";
      const col = index2 + "";
      const cellKey = row + " " + col;
      if (bombs.includes(cellKey)) {
        return (
          <Cell
            row={index}
            col={index2}
            bomb={true}
            open={false}
            key={cellKey}
          />
        );
      } else {
        return (
          <Cell
            row={index}
            col={index2}
            bomb={false}
            open={false}
            key={cellKey}
          />
        );
      }
    });
  });

  return newGrid;
};

interface MinesweeperContextType {
  grid: JSX.Element[][];
  setGrid: Dispatch<SetStateAction<JSX.Element[][]>>;
  getProximity: (arg0: number, arg1: number) => number;
  openZeros: (arg0: number, arg1: number) => void;
}

//cast empty object to contexttype
export const MinesweeperContext = createContext<MinesweeperContextType>(
  {} as MinesweeperContextType,
);

function Board(props: { rows: number; cols: number; bombs: number }) {
  const [bombArray, setBombArray] = useState(
    randomArray(props.bombs, props.rows, props.cols),
  );

  const [grid, setGrid] = useState<JSX.Element[][]>(
    boardGen(props.rows, props.cols, bombArray),
  );

  const isBomb = (row: number, col: number) => {
    const stringedValue = row + " " + col;
    return bombArray.includes(stringedValue);
  };

  const getProximity = (row: number, col: number) => {
    let bombs = 0;
    if (isBomb(row - 1, col - 1)) {
      bombs++;
    }
    if (isBomb(row - 1, col)) {
      bombs++;
    }
    if (isBomb(row - 1, col + 1)) {
      bombs++;
    }
    if (isBomb(row, col - 1)) {
      bombs++;
    }
    if (isBomb(row, col + 1)) {
      bombs++;
    }
    if (isBomb(row + 1, col - 1)) {
      bombs++;
    }
    if (isBomb(row + 1, col)) {
      bombs++;
    }
    if (isBomb(row + 1, col + 1)) {
      bombs++;
    }
    return bombs;
  };

  const openZeros = (row: number, col: number) => {
    const newGrid = grid;
    const newRow = row + "";
    const newCol = col + 1 + "";
    const cellKey = newRow + " " + newCol;

    newGrid[row][col + 1] = (
      <Cell row={row} col={col + 1} bomb={true} open={true} key={cellKey} />
    );
    setGrid(newGrid);
  };

  return (
    <div className={"grid grid-cols-9 grid-rows-9 w-full h-full"}>
      <MinesweeperContext.Provider
        value={{ grid, setGrid, getProximity, openZeros }}
      >
        {grid}
      </MinesweeperContext.Provider>
    </div>
  );
}

function Cell(props: {
  row: number;
  col: number;
  bomb: boolean;
  open: boolean;
}) {
  const { getProximity, openZeros } = useContext(MinesweeperContext);
  const [open, setOpen] = useState<boolean>(props.open);
  const proximity = getProximity(props.row, props.col);

  return (
    <div
      id={open ? "cell-open" : "cell"}
      className={"flex text-center justify-center items-center flex-wrap"}
      onClick={() => {
        openZeros(props.row, props.col);
        setOpen(true);
      }}
    >
      {open && <>{props.bomb ? "F" : proximity}</>}
    </div>
  );
}
