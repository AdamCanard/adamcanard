import { createContext, ReactNode, useState } from "react";
import { IWindow, TestRecord } from "./records";
import { createMobile } from "./createapplication";

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

  const [windows, setWindows] = useState<IWindow[]>([TestRecord["Mobile"]]);
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

  const closeWindow = (name: string) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].window.key == name) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  const openWindow = (windowKey: string) => {
    const newActiveWindows = { ...activeWindows };
    if (activeWindows[windowKey]) {
      const newWindowKey = "" + Object.values(activeWindows).length;
      for (let i = 0; i < Object.keys(activeWindows).length; i++) {
        console.log(Object.keys(activeWindows)[i]);
      }

      newActiveWindows[windowKey + newWindowKey] = createMobile(newWindowKey);
    } else {
      newActiveWindows[windowKey] = createMobile();
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
