import { useContext } from "react";
import { GridContext, ITileObject } from "./gamecontainer";
import Tile from "./tile";

export default function Grid() {
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
