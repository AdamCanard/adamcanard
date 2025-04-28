"use client";
import { createContext, useState } from "react";
import Controller from "./controller";
import { screens } from "./screens";

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
  setControls: (screenControls: IScreenActions) => void;
  screenControls: IScreenActions;
}

//cast empty object to contexttype
export const ScreenContext = createContext<ScreenContextType>(
  {} as ScreenContextType,
);
export default function GameContainer() {
  const [screen, setScreen] = useState<JSX.Element>(screens["grid"]);
  const [screenControls, setScreenControls] = useState<IScreenActions>({});
  const changeScreen = (screenKey: string) => {
    setScreen(screens[screenKey]);
  };
  const setControls = (screenControls: IScreenActions) => {
    setScreenControls(screenControls);
  };

  return (
    <ScreenContext.Provider
      value={{ changeScreen, setControls, screenControls }}
    >
      <div
        className={
          "GridCase w-full h-full flex flex-col items-center justify-around"
        }
      >
        <div className={"flex items-center justify-center h-full w-full"}>
          {screen}
        </div>
        <Controller />
      </div>
    </ScreenContext.Provider>
  );
}
