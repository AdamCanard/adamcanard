import { useState } from "react";
import { boardGen, ICellObject, isBomb } from "./minesweeperfunctions";
import Cell from "./cell";
import MinesweeperHeader from "./minesweeperheader";

export default function Board(props: {
  rows: number;
  cols: number;
  bombs: number;
  bombArray: string[];
}) {
  const [grid, setGrid] = useState<ICellObject[][]>(
    boardGen(props.rows, props.cols, props.bombArray),
  );
  const [flags, setFlags] = useState<number>(0);
  const [gameState, setGameState] = useState<string>("playing");

  const openCell = (row: number, col: number) => {
    const temp = Array(props.rows)
      .fill(undefined)
      .map(() => new Array(props.cols).fill(undefined));
    Object.assign(temp, grid);
    if (temp[row][col].value === "0") {
      openZeros(row, col, grid);
    }
    if (temp[row][col].state === "closed") {
      temp[row][col].state = "open";
    }

    setGrid(temp);
    if (isBomb(row, col, props.bombArray)) {
      setGameState("lost");
    }
  };

  const flagCell = (row: number, col: number) => {
    const temp = Array(props.rows)
      .fill(undefined)
      .map(() => new Array(props.cols).fill(undefined));
    Object.assign(temp, grid);
    if (temp[row][col].state === "flagged") {
      temp[row][col].state = "closed";
      const newflags = flags - 1;
      setFlags(newflags);
    } else if (temp[row][col].state === "closed") {
      temp[row][col].state = "flagged";
      const newflags = flags + 1;
      setFlags(newflags);
    }

    setGrid(temp);
  };

  const flagCheck = (grid: ICellObject[][], row: number, col: number) => {
    if (grid[row][col].value !== "F") {
      const value = grid[row][col].value;
      let flags = 0;
      if (row != 0) {
        if (col != 0 && grid[row - 1][col - 1].state === "flagged") {
          flags++;
        }
        if (grid[row - 1][col].state === "flagged") {
          flags++;
        }
        if (
          col != props.cols - 1 &&
          grid[row - 1][col + 1].state === "flagged"
        ) {
          flags++;
        }
      }

      if (col != 0 && grid[row][col - 1].state === "flagged") {
        flags++;
      }
      if (col != props.cols - 1 && grid[row][col + 1].state === "flagged") {
        flags++;
      }

      if (row != props.rows - 1) {
        if (col != 0 && grid[row + 1][col - 1].state === "flagged") {
          flags++;
        }
        if (grid[row + 1][col].state === "flagged") {
          flags++;
        }
        if (
          col != props.cols - 1 &&
          grid[row + 1][col + 1].state === "flagged"
        ) {
          flags++;
        }
      }

      if (flags + "" == value) {
        return true;
      }
    }
    return false;
  };

  const clearCells = (row: number, col: number) => {
    const temp = Array(props.rows)
      .fill(undefined)
      .map(() => new Array(props.cols).fill(undefined));
    Object.assign(temp, grid);
    if (flagCheck(temp, row, col)) {
      if (row != 0) {
        if (col != 0 && temp[row - 1][col - 1].state === "closed") {
          temp[row - 1][col - 1].state = "open";
        }
        if (temp[row - 1][col].state === "closed") {
          temp[row - 1][col].state = "open";
        }
        if (
          col != props.cols - 1 &&
          temp[row - 1][col + 1].state === "closed"
        ) {
          temp[row - 1][col + 1].state = "open";
        }
      }

      if (col != 0 && temp[row][col - 1].state === "closed") {
        temp[row][col - 1].state = "open";
      }
      if (col != props.cols - 1 && temp[row][col + 1].state === "closed") {
        temp[row][col + 1].state = "open";
      }

      if (row != props.rows - 1) {
        if (col != 0 && temp[row + 1][col - 1].state === "closed") {
          temp[row + 1][col - 1].state = "open";
        }
        if (temp[row + 1][col].state === "closed") {
          temp[row + 1][col].state = "open";
        }
        if (
          col != props.cols - 1 &&
          temp[row + 1][col + 1].state === "closed"
        ) {
          temp[row + 1][col + 1].state = "open";
        }
      }

      setGrid(temp);
    }
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
    <div className={"flex flex-col h-full w-full"}>
      <MinesweeperHeader
        bombs={props.bombs}
        flags={flags}
        gameState={gameState}
      />
      <div className={"grid grid-cols-9 grid-rows-9 w-full h-full"}>
        {Object.values(grid).map((row, index) => {
          return Object.values(row).map((cell, index2) => {
            return (
              <Cell
                obj={cell}
                open={openCell}
                flag={flagCell}
                clear={clearCells}
                key={index + " " + index2}
              />
            );
          });
        })}
      </div>
    </div>
  );
}
