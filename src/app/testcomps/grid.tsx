import { useContext } from "react";
import { GridContext } from "./gamecontainer";
import Tile from "./tile";
import { ITileObject } from "./gametypes";

export default function Grid() {
  const { currentGrid, rows, cols } = useContext(GridContext);
  return (
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
  );
}
