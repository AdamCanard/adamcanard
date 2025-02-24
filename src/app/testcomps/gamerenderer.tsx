import { createContext, useState } from "react";
import GameContainer from "./gamecontainer";

interface GameRenderContextType {
  setNewWindow: (arg0: JSX.Element) => void;
  resetWindow: () => void;
}

//cast empty object to contexttype
export const GameRenderContext = createContext<GameRenderContextType>(
  {} as GameRenderContextType,
);

export default function GameRenderer() {
  const setNewWindow = (newWindow: JSX.Element) => {
    setWindow(newWindow);
  };
  const resetWindow = () => {
    setWindow(<GameContainer />);
  };

  const [window, setWindow] = useState<JSX.Element>(<GameContainer />);
  return (
    <GameRenderContext.Provider value={{ setNewWindow, resetWindow }}>
      {" "}
      {window}
    </GameRenderContext.Provider>
  );
}
