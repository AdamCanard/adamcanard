import { useContext, useEffect } from "react";
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
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      b: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"GridInner"}>
      <div
        className={
          "flex flex-col justify-center items-center GridSize bg-black"
        }
      >
        <div
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: `repeat(${3}, minmax(0,1fr))`,
            gridTemplateRows: `repeat(${3}, minmax(0,1fr))`,
          }}
        >
          {map.map((row, rowIndex) => {
            return (
              <>
                {row.map((room, colIndex) => {
                  if (room.length > 0) {
                    return (
                      <div
                        className={`${rowIndex === playerRoom.row && colIndex === playerRoom.col ? "bg-yellow-500" : "bg-white"} w-8 h-8 `}
                        key={rowIndex + " " + colIndex}
                      ></div>
                    );
                  } else {
                    return (
                      <div
                        className={" w-8 h-8 border-2"}
                        key={rowIndex + " " + colIndex}
                      ></div>
                    );
                  }
                })}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}
