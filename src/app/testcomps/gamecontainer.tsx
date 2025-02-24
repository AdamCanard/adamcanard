"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Grid from "./grid";
import Controller from "./controller";
import { start } from "./rooms";

export interface ITileObject {
  row: number;
  col: number;
  value: string;
}
export const referenceGridGen = (room: string[][]) => {
  const newGrid = new Array(room.length)
    .fill(undefined)
    .map((element, rowIndex) => {
      return new Array(room[0].length)
        .fill(undefined)
        .map((element, colIndex) => {
          const tileObj: ITileObject = {
            row: rowIndex,
            col: colIndex,
            value: room[rowIndex][colIndex],
          };

          return tileObj;
        });
    });
  return newGrid;
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
  direction: string;
}

//cast empty object to contexttype
export const GridContext = createContext<GridContextType>(
  {} as GridContextType,
);

export default function GameContainer() {
  const rows = 9;
  const cols = 9;
  const referenceGrid = referenceGridGen(start);
  const [currentGrid, setCurrentGrid] =
    useState<ITileObject[][]>(referenceGrid);
  const [player, setPlayer] = useState<IPlayerType>({
    row: -1,
    col: -1,
    direction: "u",
  });
  const setPlayerDirection = (direction: string) => {
    const newPlayer = player;
    newPlayer.direction = direction;
    setPlayer(newPlayer);
  };

  const setPlayerLocation = useCallback(
    (row: number, col: number) => {
      const newPlayer = player;
      newPlayer.row = row;
      newPlayer.col = col;
      setPlayer(newPlayer);
    },
    [player],
  );

  const move = (direction: string) => {
    if (player.col === -1 || player.row === -1) {
      console.log("Can't find player'");
    }
    tryMove(direction);
  };
  const placePlayer = useCallback(() => {
    const newGrid = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
    Object.assign(newGrid, currentGrid);

    for (let i = 0; i < newGrid.length; i++) {
      for (let j = 0; j < newGrid[i].length; j++) {
        if (newGrid[i][j].value === "E") {
          newGrid[i][j].value = "P";
          setPlayerLocation(i, j);
          setCurrentGrid(newGrid);
          return;
        }
      }
    }
    setCurrentGrid(newGrid);
    return;
  }, [currentGrid, setPlayerLocation]);

  const tryMove = (direction: string) => {
    const newGrid = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
    Object.assign(newGrid, currentGrid);

    switch (direction) {
      case "a":
        switch (player.direction) {
          case "u":
            if (player.row != 0) {
              console.log(newGrid[player.row - 1][player.col].value);
            }
            break;
          case "d":
            if (player.row != rows - 1) {
              console.log(newGrid[player.row + 1][player.col].value);
            }
            break;
          case "l":
            if (player.col != 0) {
              console.log(newGrid[player.row][player.col - 1].value);
            }
            break;
          case "r":
            if (player.col != cols - 1) {
              console.log(newGrid[player.row][player.col + 1].value);
            }
            break;
        }
        break;
      case "u":
        if (
          player.row != 0 &&
          newGrid[player.row - 1][player.col].value === "E"
        ) {
          newGrid[player.row - 1][player.col].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row - 1, player.col);
        }
        setPlayerDirection("u");
        break;
      case "d":
        if (
          player.row != rows - 1 &&
          newGrid[player.row + 1][player.col].value === "E"
        ) {
          newGrid[player.row + 1][player.col].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row + 1, player.col);
        }
        setPlayerDirection("d");
        break;
      case "l":
        if (
          player.col != 0 &&
          newGrid[player.row][player.col - 1].value === "E"
        ) {
          newGrid[player.row][player.col - 1].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row, player.col - 1);
        }
        setPlayerDirection("l");
        break;
      case "r":
        if (
          player.col != cols - 1 &&
          newGrid[player.row][player.col + 1].value === "E"
        ) {
          newGrid[player.row][player.col + 1].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row, player.col + 1);
        }
        setPlayerDirection("r");
        break;

      default:
    }
    setCurrentGrid(newGrid);
  };

  useEffect(() => {
    if (player.row === -1 || player.col === -1) {
      placePlayer();
    }
  }, [player.col, player.row, placePlayer]);

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
