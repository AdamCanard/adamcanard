import { createContext, ReactElement, ReactNode, useState } from "react";

interface IWindows {
  windows: ReactElement[];
  openWindow: (newWindow: ReactElement) => void;
  closeWindow: (windowKey: string) => void;
}

export const WindowContext = createContext<IWindows>({} as IWindows);

export default function WindowProvider(props: { children: ReactNode }) {
  const [windows, setWindows] = useState<ReactElement[]>([
    <div key={"Apple"} className={"w-full h-full"}></div>,
  ]);
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
      if (windows[i].key == name) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };
  const openWindow = (newWindow: ReactElement) => {
    setWindows([...windows, newWindow]);
  };

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow }}>
      {props.children}
    </WindowContext.Provider>
  );
}
