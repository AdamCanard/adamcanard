"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import Grid from "./grid";
import Controller from "./controller";

export interface ITileObject {
  row: number;
  col: number;
  value: string;
}
export const referenceGridGen = (rows: number, cols: number) => {
  const newGrid = new Array(rows).fill(undefined).map((element, rowIndex) => {
    return new Array(cols).fill(undefined).map((element, colIndex) => {
      let value = "E";
      if (
        rowIndex === 0 ||
        colIndex === 0 ||
        rowIndex === rows - 1 ||
        colIndex === cols - 1
      ) {
        value = "W";
      }
      const tileObj: ITileObject = {
        row: rowIndex,
        col: colIndex,
        value: value,
      };

      return tileObj;
    });
  });
  return newGrid;
};
const placePlayer = (grid: ITileObject[][], rows: number, cols: number) => {
  const newGrid = Array(rows)
    .fill(undefined)
    .map(() => new Array(cols).fill(undefined));
  Object.assign(newGrid, grid);

  for (let i = 0; i < newGrid.length; i++) {
    for (let j = 0; j < newGrid[i].length; j++) {
      if (newGrid[i][j].value === "E") {
        newGrid[i][j].value = "P";
        return newGrid;
      }
    }
  }
  return grid;
};
const getPlayer = (grid: ITileObject[][]) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].value === "P") {
        return { row: i, col: j } as IPlayerType;
      }
    }
  }
  return { row: -1, col: -1 } as IPlayerType;
};
export interface GridContextType {
  currentGrid: ITileObject[][];
  setCurrentGrid: Dispatch<SetStateAction<ITileObject[][]>>;
  referenceGrid: ITileObject[][];
  move: (arg0: string) => void;
  rows: number;
  cols: number;
}

interface IPlayerType {
  row: number;
  col: number;
}

//cast empty object to contexttype
export const GridContext = createContext<GridContextType>(
  {} as GridContextType,
);

export default function GameContainer() {
  const rows = 9;
  const cols = 9;
  const referenceGrid = referenceGridGen(rows, cols);
  const [currentGrid, setCurrentGrid] =
    useState<ITileObject[][]>(referenceGrid);

  const move = (direction: string) => {
    const player: IPlayerType = getPlayer(currentGrid);
    if (player.col === -1 || player.row === -1) {
      console.log("Can't find player'");
    }
    tryMove(player, direction);
  };

  const tryMove = (player: IPlayerType, direction: string) => {
    const newGrid = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
    Object.assign(newGrid, currentGrid);

    switch (direction) {
      case "a":
        break;
      case "u":
        if (
          player.row != 0 &&
          newGrid[player.row - 1][player.col].value === "E"
        ) {
          newGrid[player.row - 1][player.col].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
        }
        break;
      case "d":
        if (
          player.row != rows - 1 &&
          newGrid[player.row + 1][player.col].value === "E"
        ) {
          newGrid[player.row + 1][player.col].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
        }
        break;
      case "l":
        if (
          player.col != 0 &&
          newGrid[player.row][player.col - 1].value === "E"
        ) {
          newGrid[player.row][player.col - 1].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
        }
        break;
      case "r":
        if (
          player.col != cols - 1 &&
          newGrid[player.row][player.col + 1].value === "E"
        ) {
          newGrid[player.row][player.col + 1].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
        }
        break;

      default:
    }
    setCurrentGrid(newGrid);
  };

  useEffect(() => {
    const player = getPlayer(currentGrid);
    if (player.row === -1 || player.col === -1) {
      setCurrentGrid(placePlayer(currentGrid, rows, cols));
    }
  }, [setCurrentGrid, currentGrid]);

  return (
    <GridContext.Provider
      value={{ currentGrid, setCurrentGrid, referenceGrid, move, rows, cols }}
    >
      <div className={"bg-[#505090] w-full h-full flex flex-col"}>
        <Grid />
        <Controller />
      </div>
    </GridContext.Provider>
  );
}
