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

  const openWindow = (newWindow: ReactElement) => {
    const newWindows = [...windows];
    newWindows.push(newWindow);
    setWindows(newWindows);
  };

  const closeWindow = (windowKey: string) => {
    console.log(windowKey);
  };

  return (
    <WindowContext.Provider value={{ windows, openWindow, closeWindow }}>
      {props.children}
    </WindowContext.Provider>
  );
}
