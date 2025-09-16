import { createContext, ReactNode, useState } from "react";
import { IWindow, WindowRecord } from "./windowrecord";

interface IWindows {
  windows: IWindow[];
  startMenu: boolean;
  toggleStartMenu: () => void;
  openWindow: (windowKey: string) => void;
  closeWindow: (windowKey: string) => void;
}

export const WindowContext = createContext<IWindows>({} as IWindows);

export default function WindowProvider(props: { children: ReactNode }) {
  const [windows, setWindows] = useState<IWindow[]>([WindowRecord["Mobile"]]);
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
    setWindows([...windows, WindowRecord[windowKey]]);
  };
  return (
    <WindowContext.Provider
      value={{ windows, startMenu, openWindow, closeWindow, toggleStartMenu }}
    >
      {props.children}
    </WindowContext.Provider>
  );
}
