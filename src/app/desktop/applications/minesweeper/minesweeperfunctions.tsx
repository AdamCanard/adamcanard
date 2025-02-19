export const randomArray = (amount: number, row: number, col: number) => {
  const newArray: string[] = [];
  for (let i = 0; i < amount; i++) {
    const newRow = Math.floor(Math.random() * row) + "";
    const newCol = Math.floor(Math.random() * col) + "";
    const newValue = newRow + " " + newCol;
    if (!newArray.includes(newValue)) {
      newArray.push(newValue);
    } else {
      i--;
    }
  }
  return newArray;
};

export const checkWin = (grid: ICellObject[][], bombs: number) => {
  let counter = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j].state === "closed" || grid[i][j].state === "flagged") {
        counter++;
      }
    }
  }
  if (counter === bombs) {
    return true;
  }
  return false;
};

export const getProximity = (row: number, col: number, bombArray: string[]) => {
  let bombs = 0;
  if (isBomb(row - 1, col - 1, bombArray)) {
    bombs++;
  }
  if (isBomb(row - 1, col, bombArray)) {
    bombs++;
  }
  if (isBomb(row - 1, col + 1, bombArray)) {
    bombs++;
  }
  if (isBomb(row, col - 1, bombArray)) {
    bombs++;
  }
  if (isBomb(row, col + 1, bombArray)) {
    bombs++;
  }
  if (isBomb(row + 1, col - 1, bombArray)) {
    bombs++;
  }
  if (isBomb(row + 1, col, bombArray)) {
    bombs++;
  }
  if (isBomb(row + 1, col + 1, bombArray)) {
    bombs++;
  }
  return bombs + "";
};

export interface ICellObject {
  row: number;
  col: number;
  bomb: boolean;
  state: string;
  value: string;
}

export const boardGen = (rows: number, cols: number, bombs: string[]) => {
  const newGrid = new Array(rows).fill(undefined).map((element, index) => {
    return new Array(cols).fill(undefined).map((element, index2) => {
      const row = index + "";
      const col = index2 + "";
      const cellKey = row + " " + col;
      let cellObj: ICellObject = {} as ICellObject;
      if (bombs.includes(cellKey)) {
        cellObj = {
          row: index,
          col: index2,
          bomb: true,
          state: "closed",
          value: "F",
        };
      } else {
        cellObj = {
          row: index,
          col: index2,
          bomb: false,
          state: "closed",
          value: getProximity(index, index2, bombs),
        };
      }

      return cellObj;
    });
  });

  return newGrid;
};

export const isBomb = (row: number, col: number, bombs: string[]) => {
  const stringedValue = row + " " + col;
  return bombs.includes(stringedValue);
};
