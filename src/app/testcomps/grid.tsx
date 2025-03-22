import { useContext } from "react";
import { GridContext } from "./gamecontainer";
import Tile from "./tile";
import { ITileObject } from "./gametypes";

export default function Grid() {
  const { currentGrid, rows, cols } = useContext(GridContext);
  return (
    <div
      style={{
        display: "grid",
        width: "100%",
        height: "100%",
        gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(0,1fr))`,
      }}
    >
      {Object.values(currentGrid).map((row: ITileObject[], index) => {
        return Object.values(row).map((tile: ITileObject, index2) => {
          return <Tile tileObj={tile} key={index + " " + index2} />;
        });
      })}
    </div>
  );
}
