import { createContext, ReactNode, useState } from "react";
import { IWindow, windowRecord } from "./windowrecord";

interface IWindows {
  windows: IWindow[];
  openWindow: (windowKey: string) => void;
  closeWindow: (windowKey: string) => void;
}

export const WindowContext = createContext<IWindows>({} as IWindows);

export default function WindowProvider(props: { children: ReactNode }) {
  const [windows, setWindows] = useState<IWindow[]>([windowRecord["Mobile"]]);
  //const isOpen = (name: string) => {
  //  for (let i = 0; i < windows.length; i++) {
  //    if (windows[i].key == name) {
  //      return true;
  //    }
  //  }
  //  return false;
  //};
  const closeWindow = (name: string) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].window.key == name) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };
  const openWindow = (windowKey: string) => {
    setWindows([...windows, windowRecord[windowKey]]);
  };
  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow }}>
      {props.children}
    </WindowContext.Provider>
  );
}
