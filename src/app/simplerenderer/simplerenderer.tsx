"use client";
import { createContext, useState } from "react";
import { SimplePicker } from "./simplepicker";
import { SimpleRender } from "./simplerender";
interface RenderContextType {
  window: JSX.Element;
  changeWindow: (newWindow: JSX.Element) => void;
  tabs: Record<string, JSX.Element>;
}

//cast empty object to contexttype
export const RenderContext = createContext<RenderContextType>(
  {} as RenderContextType,
);

export function SimpleRenderer(props: { tabs: Record<string, JSX.Element> }) {
  const [tabs] = useState<Record<string, JSX.Element>>(props.tabs);

  const renderValues = Object.values(tabs);

  const [window, setWindow] = useState<JSX.Element>(renderValues[0]);

  const changeWindow = (newWindow: JSX.Element) => {
    setWindow(newWindow);
  };

  return (
    <RenderContext.Provider value={{ window, changeWindow, tabs }}>
      <SimplePicker />
      <SimpleRender />
    </RenderContext.Provider>
  );
}
