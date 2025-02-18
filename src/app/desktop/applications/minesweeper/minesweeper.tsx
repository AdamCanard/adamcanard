"use client";
import DesktopWindow from "../../sitecomps/desktopwindow";
import { randomArray } from "./minesweeperfunctions";
import Board from "./board";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface MinesweeperContextType {
  gameState: string;
  setGameState: Dispatch<SetStateAction<string>>;
  rows: number;
  cols: number;
  bombs: number;
  bombArray: string[];
}

//cast empty object to contexttype
export const MinesweeperContext = createContext<MinesweeperContextType>(
  {} as MinesweeperContextType,
);

export default function Minesweeper() {
  const [gameState, setGameState] = useState("starting");
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [bombArray, setBombArray] = useState<string[]>([]);

  return (
    <DesktopWindow title="Minesweeper" width="" height="">
      <MinesweeperContext.Provider
        value={{ gameState, setGameState, rows, cols, bombs, bombArray }}
      >
        {" "}
        {gameState === "starting" ? (
          <>
            <button
              onClick={() => {
                setRows(9);
                setCols(9);
                setBombs(10);
                setBombArray(randomArray(10, 9, 9));
                setGameState("playing");
              }}
              id="button"
            >
              Easy
            </button>
            <button
              onClick={() => {
                setRows(16);
                setCols(16);
                setBombs(40);
                setBombArray(randomArray(40, 16, 16));
                setGameState("playing");
              }}
              id="button"
            >
              Medium
            </button>
            <button
              onClick={() => {
                setRows(16);
                setCols(30);
                setBombs(99);
                setBombArray(randomArray(99, 16, 30));
                setGameState("playing");
              }}
              id="button"
            >
              Hard
            </button>
          </>
        ) : (
          <>
            <Board />
          </>
        )}
      </MinesweeperContext.Provider>
    </DesktopWindow>
  );
}
