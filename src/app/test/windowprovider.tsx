import { createContext, ReactNode, useState } from "react";
import { IWindow } from "./records";
import { applicationEnum, createApplication } from "./createapplication";

interface IWindows {
  activeWindows: Record<string, IWindow>;
  startMenu: boolean;
  toggleStartMenu: () => void;
  openWindow: (windowKey: string) => void;
  closeWindow: (windowKey: string) => void;
  toggleMinimize: (windowKey: string) => void;
  updateWindow: (windowKey: string, newWindow: IWindow) => void;
}

export const WindowContext = createContext<IWindows>({} as IWindows);

export default function WindowProvider(props: { children: ReactNode }) {
  const [activeWindows, setActiveWindows] = useState<Record<string, IWindow>>(
    {},
  );

  const [startMenu, setStartMenu] = useState<boolean>(false);

  const toggleStartMenu = () => {
    setStartMenu(!startMenu);
  };

  const closeWindow = (windowKey: string) => {
    const newActiveWindows = { ...activeWindows };
    delete newActiveWindows[windowKey];
    setActiveWindows(newActiveWindows);
  };

  const toggleMinimize = (windowKey: string) => {
    const newActiveWindows = { ...activeWindows };
    const newWindow = newActiveWindows[windowKey];
    newWindow.minimized = !newWindow.minimized;
    newActiveWindows[windowKey] = newWindow;
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
        createApplication(applicationEnum.Mobile, keyedWindows);
    } else {
      newActiveWindows[windowKey] = createApplication(
        applicationEnum.Mobile,
        0,
      );
    }
    setActiveWindows(newActiveWindows);
  };

  const updateWindow = (windowKey: string, newWindow: IWindow) => {
    const newActiveWindows = { ...activeWindows };
    newActiveWindows[windowKey] = newWindow;
    setActiveWindows(newActiveWindows);
  };
  return (
    <WindowContext.Provider
      value={{
        activeWindows,
        startMenu,
        openWindow,
        closeWindow,
        toggleMinimize,
        toggleStartMenu,
        updateWindow,
      }}
    >
      {props.children}
    </WindowContext.Provider>
  );
}
