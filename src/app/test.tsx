"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import DesktopWindow from "./desktop/sitecomps/desktopwindow";
import { defaultHead } from "next/head";

interface ITileObject {
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
interface GridContextType {
  grid: ITileObject[][];
  setGrid: Dispatch<SetStateAction<ITileObject[][]>>;
}

interface IPlayerType {
  row: number;
  col: number;
}

//cast empty object to contexttype
export const GridContext = createContext<GridContextType>(
  {} as GridContextType,
);
export default function Test() {
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
    const newGrid = Array()
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
    <DesktopWindow title="Test" width="" height="">
      <GridContext.Provider value={{ grid, setGrid }}>
        <Grid />
        <Controller move={move} />
      </GridContext.Provider>
    </DesktopWindow>
  );
}

export function Grid() {
  const { grid } = useContext(GridContext);
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateColumns: `repeat(${8}, minmax(0,1fr))`,
        gridTemplateRows: `repeat(${8}, minmax(0,1fr))`,
      }}
    >
      {Object.values(grid).map((row: ITileObject[], index) => {
        return Object.values(row).map((tile: ITileObject, index2) => {
          return <Tile tileObj={tile} key={index + " " + index2} />;
        });
      })}
    </div>
  );
}

export function Tile(props: { tileObj: ITileObject }) {
  return (
    <div
      className={
        "flex text-center justify-center items-center flex-wrap w-8 h-8 border-2"
      }
    >
      {props.tileObj.value}
    </div>
  );
}

export function Controller(props: { move: (arg0: string) => void }) {
  return (
    <div className={"h-64"}>
      <div className={"grid grid-cols-3 grid-rows-2 w-full h-16"}>
        {" "}
        <button
          id="button"
          className={
            "col-start-2 col-span-1 row-start-1 row-span-1 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("u")}
        >
          UP
        </button>
        <button
          id="button"
          className={
            "col-start-2 col-span-1 row-start-2 row-span-1 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("d")}
        >
          DOWN
        </button>
        <button
          id="button"
          className={
            "col-start-1 col-span-1 row-start-2 row-span-2 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("l")}
        >
          LEFT
        </button>
        <button
          id="button"
          className={
            "col-start-3 col-span-1 row-start-2 row-span-2 justify-center items-center flex w-full h-full "
          }
          onClick={() => props.move("r")}
        >
          RIGHT
        </button>
      </div>

      <button
        id="button"
        className={"justify-center items-center flex w-1/2 h-16 border-2"}
        onClick={() => props.move("a")}
      >
        A
      </button>
    </div>
  );
}
