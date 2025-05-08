import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IScreenActions, ScreenContext } from "./gamecontainer";
import Tile from "./tile";
import { IPlayerType, IRoomCoord, ITileObject } from "./gametypes";
import { map } from "./rooms";
import { screens } from "./screens/screens";

export interface GridContextType {
  currentGrid: ITileObject[][];
  setCurrentGrid: Dispatch<SetStateAction<ITileObject[][]>>;
  referenceGrid: ITileObject[][];
  rows: number;
  cols: number;
}

//cast empty object to contexttype
export const GridContext = createContext<GridContextType>(
  {} as GridContextType,
);
export const referenceGridGen = (room: string[][]) => {
  const newGrid = room.map((row, rowIndex) =>
    row.map((tile, tileIndex) => {
      const tileObj: ITileObject = {
        row: rowIndex,
        col: tileIndex,
        value: tile,
        element: screens[tile],
      };
      return tileObj;
    }),
  );
  return newGrid;
};

const hasPlayer = (grid: ITileObject[][]) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].value === "player") {
        return true;
      }
    }
  }
  return false;
};

export default function Grid() {
  const rows = 9;
  const cols = 9;
  const [currentRoom, setCurrentRoom] = useState<IRoomCoord>(() => {
    const oldRoomStr = localStorage.getItem("room");
    if (oldRoomStr === null) {
      return {
        row: 1,
        col: 1,
      } as IRoomCoord;
    } else {
      return JSON.parse(oldRoomStr);
    }
  });
  const [referenceGrid, setReferenceGrid] = useState<ITileObject[][]>(
    referenceGridGen(map[currentRoom.row][currentRoom.col]),
  );

  const [currentGrid, setCurrentGrid] = useState<ITileObject[][]>(
    referenceGrid.map((row) => row.map((tile) => ({ ...tile }))),
  );

  const [player, setPlayer] = useState<IPlayerType>(() => {
    const oldPlayerStr = localStorage.getItem("player");
    if (oldPlayerStr === null) {
      return {
        row: -1,
        col: -1,
        direction: "u",
      };
    } else {
      return JSON.parse(oldPlayerStr);
    }
  });

  const { changeScreen, changeOverlay, setControls } =
    useContext(ScreenContext);

  const changeFromGrid = useCallback(
    (screenKey: string) => {
      localStorage.setItem("player", JSON.stringify(player));
      localStorage.setItem("room", JSON.stringify(currentRoom));
      changeScreen(screenKey);
    },
    [changeScreen, currentRoom, player],
  );

  const setPlayerDirection = useCallback(
    (direction: string) => {
      const newPlayer = player;
      newPlayer.direction = direction;
      setPlayer(newPlayer);
    },
    [player],
  );

  const setPlayerLocation = useCallback(
    (row: number, col: number) => {
      const newPlayer = player;
      newPlayer.row = row;
      newPlayer.col = col;
      setPlayer(newPlayer);
    },
    [player],
  );
  const lookAt = useCallback(
    (row: number, col: number) => {
      changeFromGrid(currentGrid[row][col].value);
    },
    [changeFromGrid, currentGrid],
  );
  const changeRoom = useCallback(
    (direction: string) => {
      const newRoomCoord: IRoomCoord = { ...currentRoom };
      switch (direction) {
        case "l":
          setPlayerLocation(4, 8);
          newRoomCoord.col = currentRoom.col - 1;
          break;
        case "r":
          setPlayerLocation(4, 0);
          newRoomCoord.col = currentRoom.col + 1;
          break;
        case "u":
          setPlayerLocation(8, 4);
          newRoomCoord.row = currentRoom.row - 1;
          break;
        case "d":
          setPlayerLocation(0, 4);
          newRoomCoord.row = currentRoom.row + 1;
          break;
      }

      setCurrentRoom(newRoomCoord);
    },
    [currentRoom, setPlayerLocation],
  );
  const look = useCallback(() => {
    switch (player.direction) {
      case "u":
        if (player.row != 0) {
          lookAt(player.row - 1, player.col);
        }
        break;
      case "d":
        if (player.row != rows - 1) {
          lookAt(player.row + 1, player.col);
        }
        break;
      case "l":
        if (player.col != 0) {
          lookAt(player.row, player.col - 1);
        }
        break;
      case "r":
        if (player.col != cols - 1) {
          lookAt(player.row, player.col + 1);
        }
        break;
    }
  }, [lookAt, player]);

  const up = useCallback(() => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));
    if (player.row === 0) {
      changeRoom("d");
    } else if (newGrid[player.row - 1][player.col].value === "empty") {
      newGrid[player.row - 1][player.col].value = "player";
      newGrid[player.row][player.col].value =
        referenceGrid[player.row][player.col].value;
      setPlayerLocation(player.row - 1, player.col);
    }
    setPlayerDirection("u");
    setCurrentGrid(newGrid);
  }, [
    currentGrid,
    player,
    referenceGrid,
    changeRoom,
    setPlayerLocation,
    setPlayerDirection,
  ]);

  const down = useCallback(() => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));
    if (player.row === rows - 1) {
      changeRoom("d");
    } else if (newGrid[player.row + 1][player.col].value === "empty") {
      newGrid[player.row + 1][player.col].value = "player";
      newGrid[player.row][player.col].value =
        referenceGrid[player.row][player.col].value;
      setPlayerLocation(player.row + 1, player.col);
    }
    setPlayerDirection("d");
    setCurrentGrid(newGrid);
  }, [
    currentGrid,
    player,
    referenceGrid,
    rows,
    changeRoom,
    setPlayerLocation,
    setPlayerDirection,
  ]);

  const left = useCallback(() => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));
    if (player.col === 0) {
      changeRoom("l");
    } else if (newGrid[player.row][player.col - 1].value === "empty") {
      newGrid[player.row][player.col - 1].value = "player";
      newGrid[player.row][player.col].value =
        referenceGrid[player.row][player.col].value;
      setPlayerLocation(player.row, player.col - 1);
    }
    setPlayerDirection("l");
    setCurrentGrid(newGrid);
  }, [
    currentGrid,
    player,
    referenceGrid,
    changeRoom,
    setPlayerLocation,
    setPlayerDirection,
  ]);

  const right = useCallback(() => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));
    if (player.col === cols - 1) {
      changeRoom("r");
    } else if (newGrid[player.row][player.col + 1].value === "empty") {
      newGrid[player.row][player.col + 1].value = "player";
      newGrid[player.row][player.col].value =
        referenceGrid[player.row][player.col].value;
      setPlayerLocation(player.row, player.col + 1);
    }
    setPlayerDirection("r");
    setCurrentGrid(newGrid);
  }, [
    currentGrid,
    player,
    referenceGrid,
    cols,
    changeRoom,
    setPlayerLocation,
    setPlayerDirection,
  ]);
  const select = useCallback(() => {
    changeOverlay("map");
  }, [changeOverlay]);

  const start = useCallback(() => {
    changeOverlay("pause");
  }, [changeOverlay]);

  const placePlayer = useCallback(() => {
    const newGrid = currentGrid.map((row) => row.map((tile) => ({ ...tile })));
    if (!hasPlayer(newGrid)) {
      if (player.row !== -1 && player.col !== -1) {
        newGrid[player.row][player.col].value = "player";
      } else {
        for (let i = 0; i < newGrid.length; i++) {
          for (let j = 0; j < newGrid[i].length; j++) {
            if (newGrid[i][j].value === "empty") {
              newGrid[i][j].value = "player";
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
  }, [currentGrid, setPlayerLocation, player.col, player.row]);

  useEffect(() => {
    setReferenceGrid(referenceGridGen(map[currentRoom.row][currentRoom.col]));
  }, [currentRoom]);

  useEffect(() => {
    const newGrid = referenceGrid.map((row) =>
      row.map((tile) => ({ ...tile })),
    );
    setCurrentGrid(newGrid);
  }, [referenceGrid]);

  useEffect(() => {
    if (!hasPlayer(currentGrid)) {
      placePlayer();
    }
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGrid, placePlayer]);

  const gridControls: IScreenActions = useMemo(
    () => ({
      a: look,
      b: () => console.log("here"),
      up,
      down,
      left,
      right,
      select,
      start,
    }),
    [look, up, down, left, right, select, start],
  );

  return (
    <GridContext.Provider
      value={{
        currentGrid,
        setCurrentGrid,
        referenceGrid,
        rows,
        cols,
      }}
    >
      {" "}
      <div
        style={{
          display: "grid",
          width: "288px",
          height: "288px",
          gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0,1fr))`,
          backgroundColor: " #505090",
        }}
      >
        {Object.values(currentGrid).map((row: ITileObject[], index) => {
          return Object.values(row).map((tile: ITileObject, index2) => {
            return <Tile tileObj={tile} key={index + " " + index2} />;
          });
        })}
      </div>
    </GridContext.Provider>
  );
}
