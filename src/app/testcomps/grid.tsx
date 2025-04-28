import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { IScreenActions, ScreenContext } from "./gamecontainer";
import Tile from "./tile";
import { IPlayerType, IRoomCoord, ITileObject } from "./gametypes";
import { screens } from "./screens";
import { map } from "./rooms";

export interface GridContextType {
  currentGrid: ITileObject[][];
  setCurrentGrid: Dispatch<SetStateAction<ITileObject[][]>>;
  referenceGrid: ITileObject[][];
  move: (arg0: string) => void;
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
      const key = Object.keys(room[rowIndex][tileIndex])[0];
      const toRender = Object.values(room[rowIndex][tileIndex])[0];
      const tileObj: ITileObject = {
        row: rowIndex,
        col: tileIndex,
        value: key,
        element: screens[toRender],
      };
      return tileObj;
    }),
  );
  return newGrid;
};

const hasPlayer = (grid: ITileObject[][]) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].value === "P") {
        return true;
      }
    }
  }
  return false;
};

export default function Grid() {
  const rows = 9;
  const cols = 9;
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

  const { changeScreen, setControls } = useContext(ScreenContext);

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

  const look = () => {
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
  };

  const move = (direction: string) => {
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
        changeScreen("grid");
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
  }, [currentGrid, setPlayerLocation, player.col, player.row]);

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
        setPlayerLocation(8, 4);
        newRoomCoord.col = currentRoom.row - 1;
        setCurrentRoom(newRoomCoord);
        break;
      case "d":
        setPlayerLocation(0, 4);
        newRoomCoord.col = currentRoom.row + 1;
        setCurrentRoom(newRoomCoord);
        break;
    }
  };

  const action = (row: number, col: number) => {
    const newWindow: Record<string, JSX.Element> = {};
    newWindow[currentGrid[row][col].value] = currentGrid[row][col].element;
    changeScreen("");
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
  }, [currentGrid, placePlayer]);

  const gridControls: IScreenActions = {
    a: look,
  };

  setControls(gridControls);

  return (
    <GridContext.Provider
      value={{
        currentGrid,
        setCurrentGrid,
        referenceGrid,
        move,
        rows,
        cols,
      }}
    >
      <div className={"GridInner"}>
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
      </div>
    </GridContext.Provider>
  );
}
