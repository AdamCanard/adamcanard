import { useContext, useState } from "react";
import {
  boardGen,
  checkWin,
  ICellObject,
  isBomb,
} from "./minesweeperfunctions";
import Cell from "./cell";
import MinesweeperHeader from "./minesweeperheader";
import { MinesweeperContext } from "./minesweeper";
export default function Board() {
  const { rows, cols, bombArray, setGameState, bombs } =
    useContext(MinesweeperContext);
  const [grid, setGrid] = useState<ICellObject[][]>(
    boardGen(rows, cols, bombArray),
  );
  const [flags, setFlags] = useState<number>(0);

  const openCell = (row: number, col: number) => {
    const temp = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
    Object.assign(temp, grid);
    if (temp[row][col].value === "0") {
      openZeros(row, col, grid);
    }
    if (temp[row][col].state === "closed") {
      temp[row][col].state = "open";
    }

    setGrid(temp);
    if (isBomb(row, col, bombArray)) {
      setGameState("lost");
    }
    if (checkWin(temp, bombs)) {
      setGameState("won");
    }
  };

  const flagCell = (row: number, col: number) => {
    const temp = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
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
        if (col != cols - 1 && grid[row - 1][col + 1].state === "flagged") {
          flags++;
        }
      }

      if (col != 0 && grid[row][col - 1].state === "flagged") {
        flags++;
      }
      if (col != cols - 1 && grid[row][col + 1].state === "flagged") {
        flags++;
      }

      if (row != rows - 1) {
        if (col != 0 && grid[row + 1][col - 1].state === "flagged") {
          flags++;
        }
        if (grid[row + 1][col].state === "flagged") {
          flags++;
        }
        if (col != cols - 1 && grid[row + 1][col + 1].state === "flagged") {
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
    const temp = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
    Object.assign(temp, grid);
    if (flagCheck(temp, row, col)) {
      if (temp[row][col].value === "0") {
        openZeros(row, col, temp);
      }

      if (row != 0) {
        if (col != 0 && temp[row - 1][col - 1].state === "closed") {
          temp[row - 1][col - 1].state = "open";
          if (isBomb(row - 1, col - 1, bombArray)) {
            setGameState("lost");
          }
          if (temp[row - 1][col - 1].value === "0") {
            openZeros(row - 1, col - 1, temp);
          }
        }
        if (temp[row - 1][col].state === "closed") {
          temp[row - 1][col].state = "open";
          if (isBomb(row - 1, col, bombArray)) {
            setGameState("lost");
          }
          if (temp[row - 1][col].value === "0") {
            openZeros(row - 1, col, temp);
          }
        }
        if (col != cols - 1 && temp[row - 1][col + 1].state === "closed") {
          temp[row - 1][col + 1].state = "open";
          if (isBomb(row - 1, col + 1, bombArray)) {
            setGameState("lost");
          }
          if (temp[row - 1][col + 1].value === "0") {
            openZeros(row - 1, col + 1, temp);
          }
        }
      }

      if (col != 0 && temp[row][col - 1].state === "closed") {
        temp[row][col - 1].state = "open";
        if (isBomb(row, col - 1, bombArray)) {
          setGameState("lost");
        }
        if (temp[row][col - 1].value === "0") {
          openZeros(row, col - 1, temp);
        }
      }
      if (col != cols - 1 && temp[row][col + 1].state === "closed") {
        temp[row][col + 1].state = "open";
        if (isBomb(row, col + 1, bombArray)) {
          setGameState("lost");
        }
        if (temp[row][col + 1].value === "0") {
          openZeros(row, col + 1, temp);
        }
      }

      if (row != rows - 1) {
        if (col != 0 && temp[row + 1][col - 1].state === "closed") {
          temp[row + 1][col - 1].state = "open";
          if (isBomb(row + 1, col - 1, bombArray)) {
            setGameState("lost");
          }
          if (temp[row + 1][col - 1].value === "0") {
            openZeros(row + 1, col - 1, temp);
          }
        }
        if (temp[row + 1][col].state === "closed") {
          temp[row + 1][col].state = "open";
          if (isBomb(row + 1, col, bombArray)) {
            setGameState("lost");
          }
          if (temp[row + 1][col].value === "0") {
            openZeros(row + 1, col, temp);
          }
        }
        if (col != cols - 1 && temp[row + 1][col + 1].state === "closed") {
          temp[row + 1][col + 1].state = "open";
          if (isBomb(row + 1, col + 1, bombArray)) {
            setGameState("lost");
          }
          if (temp[row + 1][col + 1].value === "0") {
            openZeros(row + 1, col + 1, temp);
          }
        }
      }

      setGrid(temp);
      if (checkWin(temp, bombs)) {
        setGameState("won");
      }
    }
  };

  const openZeros = (row: number, col: number, grid: ICellObject[][]) => {
    const temp = Array(rows)
      .fill(undefined)
      .map(() => new Array(cols).fill(undefined));
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
      if (col != cols - 1 && temp[row - 1][col + 1].state === "closed") {
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
    if (col != cols - 1 && temp[row][col + 1].state === "closed") {
      if (temp[row][col + 1].value === "0") {
        openZeros(row, col + 1, temp);
      } else {
        temp[row][col + 1].state = "open";
      }
    }

    if (row != rows - 1) {
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
      if (col != cols - 1 && temp[row + 1][col + 1].state === "closed") {
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
      <MinesweeperHeader flags={flags} />
      <div
        style={{
          display: "grid",
          width: "100%",
          height: "100%",
          gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0,1fr))`,
        }}
      >
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
