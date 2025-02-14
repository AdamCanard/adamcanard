"use client";
import DesktopWindow from "../../sitecomps/desktopwindow";
import { randomArray } from "./minesweeperfunctions";
import Board from "./board";
import { useState } from "react";

export default function Minesweeper() {
  const [difficulty, setDifficulty] = useState("");
  return (
    <DesktopWindow title="Minesweeper" width="" height="">
      {difficulty === "" ? (
        <>
          <button onClick={() => setDifficulty("easy")} id="button">
            Easy
          </button>
          <button onClick={() => setDifficulty("medium")} id="button">
            Medium
          </button>
          <button onClick={() => setDifficulty("hard")} id="button">
            Hard
          </button>
        </>
      ) : (
        <>
          {difficulty === "easy" && (
            <Board
              rows={9}
              cols={9}
              bombs={10}
              bombArray={randomArray(10, 9, 9)}
            />
          )}
          {difficulty === "medium" && (
            <Board
              rows={16}
              cols={16}
              bombs={40}
              bombArray={randomArray(40, 16, 16)}
            />
          )}
          {difficulty === "hard" && (
            <Board
              rows={16}
              cols={30}
              bombs={99}
              bombArray={randomArray(99, 16, 30)}
            />
          )}
        </>
      )}
    </DesktopWindow>
  );
}
