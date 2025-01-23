import { useState } from "react";
import { boardGen, ICellObject } from "./minesweeperfunctions";
import Cell from "./cell";

export default function Board(props: {
  rows: number;
  cols: number;
  bombs: number;
  bombArray: string[];
}) {
  const [grid, setGrid] = useState<ICellObject[][]>(
    boardGen(props.rows, props.cols, props.bombArray),
  );

  const openCell = (row: number, col: number) => {
    const temp = Array(props.rows)
      .fill(undefined)
      .map(() => new Array(props.cols).fill(undefined));
    Object.assign(temp, grid);
    if (temp[row][col].value === "0") {
      openZeros(row, col, grid);
    }
    temp[row][col].state = "open";

    setGrid(temp);
  };

  const openZeros = (row: number, col: number, grid: ICellObject[][]) => {
    const temp = Array(props.rows)
      .fill(undefined)
      .map(() => new Array(props.cols).fill(undefined));
    Object.assign(temp, grid);
    temp[row][col].state = "open";

    if (row != 0) {
      if (col != 0 && temp[row - 1][col - 1].state === "closed") {
        if (temp[row - 1][col - 1].value === "0") {
          openZeros(row - 1, col - 1, temp);
        } else {
          temp[row - 1][col - 1].state = "open";
        }
      }
      if (temp[row - 1][col].state === "closed") {
        if (temp[row - 1][col].value === "0") {
          openZeros(row - 1, col, temp);
        } else {
          temp[row - 1][col].state = "open";
        }
      }
      if (col != props.cols - 1 && temp[row - 1][col + 1].state === "closed") {
        if (temp[row - 1][col + 1].value === "0") {
          openZeros(row - 1, col + 1, temp);
        } else {
          temp[row - 1][col + 1].state = "open";
        }
      }
    }

    if (col != 0 && temp[row][col - 1].state === "closed") {
      if (temp[row][col - 1].value === "0") {
        openZeros(row, col - 1, temp);
      } else {
        temp[row][col - 1].state = "open";
      }
    }
    if (col != props.cols - 1 && temp[row][col + 1].state === "closed") {
      if (temp[row][col + 1].value === "0") {
        openZeros(row, col + 1, temp);
      } else {
        temp[row][col + 1].state = "open";
      }
    }

    if (row != props.rows - 1) {
      if (col != 0 && temp[row + 1][col - 1].state === "closed") {
        if (temp[row + 1][col - 1].value === "0") {
          openZeros(row + 1, col - 1, temp);
        } else {
          temp[row + 1][col - 1].state = "open";
        }
      }
      if (temp[row + 1][col].state === "closed") {
        if (temp[row + 1][col].value === "0") {
          openZeros(row + 1, col, temp);
        } else {
          temp[row + 1][col].state = "open";
        }
      }
      if (col != props.cols - 1 && temp[row + 1][col + 1].state === "closed") {
        if (temp[row + 1][col + 1].value === "0") {
          openZeros(row + 1, col + 1, temp);
        } else {
          temp[row + 1][col + 1].state = "open";
        }
      }
    }

    setGrid(temp);
  };

  return (
    <div className={"grid grid-cols-9 grid-rows-9 w-full h-full"}>
      {Object.values(grid).map((row, index) => {
        return Object.values(row).map((cell, index2) => {
          return <Cell obj={cell} open={openCell} key={index + " " + index2} />;
        });
      })}
    </div>
  );
}
