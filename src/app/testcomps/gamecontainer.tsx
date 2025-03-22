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
import { map } from "./rooms";

export interface ITileObject {
  row: number;
  col: number;
  value: string;
  element: JSX.Element;
}
export const referenceGridGen = (room: Record<string, JSX.Element>[][]) => {
  const newGrid = room.map((row, rowIndex) =>
    row.map((tile, tileIndex) => {
      const key = Object.keys(room[rowIndex][tileIndex])[0];
      const toRender = Object.values(room[rowIndex][tileIndex])[0];
      const tileObj: ITileObject = {
        row: rowIndex,
        col: tileIndex,
        value: key,
        element: toRender,
      };
      return tileObj;
    }),
  );
  return newGrid;
};

export interface GridContextType {
  setNewWindow: (arg0: Record<string, JSX.Element>) => void;
  resetWindow: () => void;
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

interface IRoomCoord {
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

  const [window, setWindow] = useState<Record<string, JSX.Element>>({
    main: <Grid />,
  });

  const [currentRoom, setCurrentRoom] = useState<IRoomCoord>({
    row: 1,
    col: 1,
  } as IRoomCoord);

  const [referenceGrid, setReferenceGrid] = useState<ITileObject[][]>(
    referenceGridGen(map[currentRoom.row][currentRoom.col]),
  );

  const [currentGrid, setCurrentGrid] = useState<ITileObject[][]>(
    referenceGrid.map((row) => row.map((tile) => ({ ...tile }))),
  );
  const [player, setPlayer] = useState<IPlayerType>({
    row: -1,
    col: -1,
    direction: "u",
  });

  const setNewWindow = (newWindow: Record<string, JSX.Element>) => {
    setWindow(newWindow);
  };

  const resetWindow = () => {
    setWindow({
      main: <Grid />,
    });
  };

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

  const hasPlayer = useCallback((grid: ITileObject[][]) => {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].value === "P") {
          return true;
        }
      }
    }
    return false;
  }, []);

  const placePlayer = useCallback(() => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));
    if (!hasPlayer(newGrid)) {
      if (player.row !== -1 && player.col !== -1) {
        newGrid[player.row][player.col].value = "P";
      } else {
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
      }
    }
    setCurrentGrid(newGrid);
    return;
  }, [currentGrid, setPlayerLocation, hasPlayer, player.col, player.row]);

  const tryMove = (direction: string) => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));

    switch (direction) {
      case "a":
        switch (player.direction) {
          case "u":
            if (player.row != 0) {
              action(player.row - 1, player.col);
            }
            break;
          case "d":
            if (player.row != rows - 1) {
              action(player.row + 1, player.col);
            }
            break;
          case "l":
            if (player.col != 0) {
              action(player.row, player.col - 1);
            }
            break;
          case "r":
            if (player.col != cols - 1) {
              action(player.row, player.col + 1);
            }
            break;
        }
        break;
      case "b":
        resetWindow();
        break;

      case "u":
        if (player.row === 0) {
          changeRoom("d");
        } else if (
          newGrid[player.row - 1][player.col].value === "E" &&
          Object.keys(window)[0] === "main"
        ) {
          newGrid[player.row - 1][player.col].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row - 1, player.col);
        }
        setPlayerDirection("u");
        break;
      case "d":
        if (player.row === rows - 1) {
          changeRoom("d");
        } else if (
          newGrid[player.row + 1][player.col].value === "E" &&
          Object.keys(window)[0] === "main"
        ) {
          newGrid[player.row + 1][player.col].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row + 1, player.col);
        }
        setPlayerDirection("d");
        break;
      case "l":
        if (player.col === 0) {
          changeRoom("l");
        } else if (
          newGrid[player.row][player.col - 1].value === "E" &&
          Object.keys(window)[0] === "main"
        ) {
          newGrid[player.row][player.col - 1].value = "P";
          newGrid[player.row][player.col].value =
            referenceGrid[player.row][player.col].value;
          setPlayerLocation(player.row, player.col - 1);
        }
        setPlayerDirection("l");
        break;
      case "r":
        if (player.col === cols - 1) {
          changeRoom("r");
        } else if (
          newGrid[player.row][player.col + 1].value === "E" &&
          Object.keys(window)[0] === "main"
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

  const changeRoom = (direction: string) => {
    const newRoomCoord: IRoomCoord = currentRoom;
    switch (direction) {
      case "l":
        setPlayerLocation(4, 8);
        newRoomCoord.col = currentRoom.col - 1;
        setCurrentRoom(newRoomCoord);
        break;
      case "r":
        setPlayerLocation(4, 0);
        newRoomCoord.col = currentRoom.col + 1;
        setCurrentRoom(newRoomCoord);
        break;
      case "u":
        break;
      case "d":
        break;
    }
  };

  const action = (row: number, col: number) => {
    const newWindow: Record<string, JSX.Element> = {};
    newWindow[currentGrid[row][col].value] = currentGrid[row][col].element;
    setNewWindow(newWindow);
  };
  useEffect(() => {
    setReferenceGrid(referenceGridGen(map[currentRoom.row][currentRoom.col]));
  }, [currentRoom.row, currentRoom.col]);

  useEffect(() => {
    setCurrentGrid(
      referenceGrid.map((row) => row.map((tile) => ({ ...tile }))),
    );
  }, [referenceGrid]);

  useEffect(() => {
    if (!hasPlayer(currentGrid)) {
      placePlayer();
    }
  }, [currentGrid, hasPlayer, placePlayer]);

  return (
    <GridContext.Provider
      value={{
        currentGrid,
        setCurrentGrid,
        referenceGrid,
        move,
        rows,
        cols,
        setNewWindow,
        resetWindow,
      }}
    >
      <div className={"bg-[#505090] w-full h-full flex flex-col"}>
        {Object.values(window)[0]}
        <Controller />
      </div>
    </GridContext.Provider>
  );
}
