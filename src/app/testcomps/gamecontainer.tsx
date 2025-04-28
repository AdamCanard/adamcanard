"use client";
import { createContext, useState } from "react";
import Controller from "./controller";
import { screens } from "./screens";

export interface IScreen {
  window: JSX.Element;
  actions: IScreenActions;
}

export interface IScreenActions {
  a?: () => void;
  b?: () => void;
  up?: () => void;
  down?: () => void;
  left?: () => void;
  right?: () => void;
  select?: () => void;
  start?: () => void;
}
export interface ScreenContextType {
  changeScreen: (screenKey: string) => void;
}

//cast empty object to contexttype
export const ScreenContext = createContext<ScreenContextType>(
  {} as ScreenContextType,
);
export default function GameContainer() {
  const [screen, setScreen] = useState<IScreen>(screens["grid"]);

  const changeScreen = (screenKey: string) => {
    setScreen(screens[screenKey]);
  };

  return (
    <ScreenContext.Provider value={{ changeScreen }}>
      <div
        className={
          "GridCase w-full h-full flex flex-col items-center justify-around"
        }
      >
        <div className={"flex items-center justify-center h-full w-full"}>
          {screen.window}
        </div>
        <Controller />
      </div>
    </ScreenContext.Provider>
  );
}
