import { useState } from "react";
import Board from "./board";
import { randomArray } from "./minesweeperfunctions";
import MinesweeperModal from "./minesweepermodal";

export default function MinesweeperGame(props: {
  rows: number;
  cols: number;
  bombs: number;
}) {
  const [gameState, setGameState] = useState("starting");
  const { rows, cols, bombs } = { ...props };
  const changeGameState = (newGameState: string) => {
    setGameState(newGameState);
  };
  return (
    <>
      {gameState === "lost" && (
        <MinesweeperModal
          changeGameState={changeGameState}
          message="Try Again?"
        />
      )}
      {gameState === "won" && (
        <MinesweeperModal
          changeGameState={changeGameState}
          message="Awesome Job!"
        />
      )}
      <Board
        rows={rows}
        cols={cols}
        bombs={bombs}
        bombArray={randomArray(bombs, rows, cols)}
        changeGameState={changeGameState}
        gameState={gameState}
      />
    </>
  );
}
