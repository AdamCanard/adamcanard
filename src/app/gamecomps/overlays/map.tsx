import { useCallback, useContext, useEffect, useState } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";
import { IRoomCoord } from "../gametypes";
import { map } from "../rooms";

export default function Map() {
  const playerRoom: IRoomCoord = JSON.parse(
    localStorage.getItem("room") || "",
  ) || {
    row: 1,
    col: 1,
  };
  const { changeOverlay, setControls, screenControls } =
    useContext(ScreenContext);

  const [storedControls] = useState(screenControls);

  const b = useCallback(() => {
    setControls(storedControls);
    changeOverlay("");
  }, [changeOverlay, setControls, storedControls]);
  const select = useCallback(() => {
    setControls(storedControls);
    changeOverlay("");
  }, [changeOverlay, setControls, storedControls]);

  useEffect(() => {
    const gridControls: IScreenActions = {
      b,
      select,
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      style={{
        display: "grid",
        gap: "8px",
        gridTemplateColumns: `repeat(${map.length}, minmax(0,1fr))`,
        gridTemplateRows: `repeat(${map[0].length}, minmax(0,1fr))`,
      }}
    >
      {map.map((row, rowIndex) => {
        return row.map((room, colIndex) => {
          if (room.length > 0) {
            return (
              <div
                className={`${rowIndex === playerRoom.row && colIndex === playerRoom.col ? "bg-yellow-500" : "bg-white"} w-8 h-8 border-2 border-white `}
                key={rowIndex + " " + colIndex}
              ></div>
            );
          } else {
            return (
              <div
                className={" w-8 h-8 border-2 border-white"}
                key={rowIndex + " " + colIndex}
              ></div>
            );
          }
        });
      })}
    </div>
  );
}
