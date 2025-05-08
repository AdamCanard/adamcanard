"use client";
import { createContext, useState } from "react";
import Controller from "./controller";
import { screens } from "./screens/screens";
import { overlays } from "./overlays/overlays";

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
  changeOverlay: (overlayKey: string) => void;
  setControls: (screenControls: IScreenActions) => void;
  screenControls: IScreenActions;
}
export const emptyActions = {
  a: () => {},
  b: () => {},
  up: () => {},
  down: () => {},
  left: () => {},
  right: () => {},
  select: () => {},
  start: () => {},
};

//cast empty object to contexttype
export const ScreenContext = createContext<ScreenContextType>(
  {} as ScreenContextType,
);
export default function GameContainer() {
  const [screen, setScreen] = useState<JSX.Element>(screens["home"]);
  const [overlay, setOverlay] = useState<JSX.Element>(overlays[""]);
  const [overlayFlag, setOverlayFlag] = useState<boolean>(false);
  const [screenControls, setScreenControls] =
    useState<IScreenActions>(emptyActions);
  const changeScreen = (screenKey: string) => {
    setScreen(screens[screenKey]);
  };
  const changeOverlay = (overlayKey: string) => {
    if (overlayKey === "") {
      setOverlayFlag(false);
    } else {
      setOverlayFlag(true);
    }
    setOverlay(overlays[overlayKey]);
  };

  const setControls = (screenControls: IScreenActions) => {
    setScreenControls(screenControls);
  };

  return (
    <ScreenContext.Provider
      value={{ changeScreen, changeOverlay, setControls, screenControls }}
    >
      <div
        className={
          "GridCase w-full h-full flex flex-col items-center justify-around"
        }
      >
        <div
          className={"flex  items-center justify-center h-full w-full relative"}
        >
          <div className={"GridInner"}>
            {" "}
            {overlayFlag ? (
              <div
                className={
                  "bg-primary bg-opacity-75 GridSize absolute flex items-center justify-center z-50"
                }
              >
                {overlay}
              </div>
            ) : (
              <> {screen}</>
            )}
          </div>
        </div>
        <Controller />
      </div>
    </ScreenContext.Provider>
  );
}
