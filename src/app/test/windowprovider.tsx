import { createContext, ReactNode, useState } from "react";
import { IWindow } from "./records";
import {
  applicationEnum,
  createAnotherApplication,
  createNewApplication,
} from "./createapplication";

interface IWindows {
  activeWindows: Record<string, IWindow>;
  startMenu: boolean;
  toggleStartMenu: () => void;
  openWindow: (windowKey: string) => void;
  closeWindow: (windowKey: string) => void;
}

export const WindowContext = createContext<IWindows>({} as IWindows);

export default function WindowProvider(props: { children: ReactNode }) {
  const [activeWindows, setActiveWindows] = useState<Record<string, IWindow>>(
    {},
  );

  const [startMenu, setStartMenu] = useState<boolean>(false);
  //const isOpen = (name: string) => {
  //  for (let i = 0; i < windows.length; i++) {
  //    if (windows[i].key == name) {
  //      return true;
  //    }
  //  }
  //  return false;
  //};
  //

  const toggleStartMenu = () => {
    setStartMenu(!startMenu);
  };

  const closeWindow = (windowKey: string) => {
    const newActiveWindows = { ...activeWindows };
    delete newActiveWindows[windowKey];
    setActiveWindows(newActiveWindows);
  };

  const openWindow = (windowKey: string) => {
    const newActiveWindows = { ...activeWindows };
    if (activeWindows[windowKey]) {
      let keyedWindows = 1;
      while (activeWindows[windowKey + ` (${keyedWindows})`]) {
        keyedWindows += 1;
      }

      newActiveWindows[applicationEnum.Mobile + ` (${keyedWindows})`] =
        createAnotherApplication(applicationEnum.Mobile, keyedWindows);
    } else {
      newActiveWindows[windowKey] = createNewApplication(
        applicationEnum.Mobile,
      );
    }
    console.log(newActiveWindows);
    setActiveWindows(newActiveWindows);
  };
  return (
    <WindowContext.Provider
      value={{
        activeWindows,
        startMenu,
        openWindow,
        closeWindow,
        toggleStartMenu,
      }}
    >
      {props.children}
    </WindowContext.Provider>
  );
}
