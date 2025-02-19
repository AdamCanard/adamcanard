"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import Grid from "./grid";
import Controller from "./controller";

export interface ITileObject {
  row: number;
  col: number;
  value: string;
}
export const gridGen = (rows: number, cols: number) => {
  const newGrid = new Array(rows).fill(undefined).map((element, rowIndex) => {
    return new Array(cols).fill(undefined).map((element, colIndex) => {
      let value = "E";
      if (rowIndex === 0 && colIndex === 0) {
        value = "P";
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
export interface GridContextType {
  grid: ITileObject[][];
  setGrid: Dispatch<SetStateAction<ITileObject[][]>>;
  move: (arg0: string) => void;
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
  const rows = 8;
  const cols = 8;
  const [grid, setGrid] = useState<ITileObject[][]>(gridGen(rows, cols));

  const getPlayer = () => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].value === "P") {
          return { row: i, col: j } as IPlayerType;
        }
      }
    }
    return { row: -1, col: -1 } as IPlayerType;
  };

  const move = (direction: string) => {
    //Gives "[row]:[col]"
    const player: IPlayerType = getPlayer();
    if (player.col === -1 || player.row === -1) {
      console.log("Can't find player'");
    }
    tryMove(player, direction);
  };

  const tryMove = (player: IPlayerType, direction: string) => {
    const newGrid = Array(undefined)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
    Object.assign(newGrid, grid);

    switch (direction) {
      case "a":
        break;
      case "u":
        if (player.row != 0) {
          newGrid[player.row - 1][player.col].value = "P";
          newGrid[player.row][player.col].value = "E";
        }
        break;
      case "d":
        if (player.row != rows - 1) {
          newGrid[player.row + 1][player.col].value = "P";
          newGrid[player.row][player.col].value = "E";
        }
        break;
      case "l":
        if (player.col != 0) {
          newGrid[player.row][player.col - 1].value = "P";
          newGrid[player.row][player.col].value = "E";
        }
        break;
      case "r":
        if (player.col != cols - 1) {
          newGrid[player.row][player.col + 1].value = "P";
          newGrid[player.row][player.col].value = "E";
        }
        break;

      default:
    }
    setGrid(newGrid);
  };

  return (
    <GridContext.Provider value={{ grid, setGrid, move }}>
      <Grid />
      <Controller />
    </GridContext.Provider>
  );
}
