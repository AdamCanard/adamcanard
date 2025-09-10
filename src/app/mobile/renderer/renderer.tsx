"use client";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ScreenPicker } from "./screenpicker";
import { ScreenRenderer } from "./screenrenderer";

interface RenderContextType {
  window: JSX.Element;
  setWindow: Dispatch<SetStateAction<JSX.Element>>;
  toRender: Record<string, JSX.Element>;
}

//cast empty object to contexttype
export const RenderContext = createContext<RenderContextType>(
  {} as RenderContextType,
);

export function Renderer(props: { toRender: Record<string, JSX.Element> }) {
  const renderValues = Object.values(props.toRender);
  const { toRender } = props;
  const [window, setWindow] = useState<JSX.Element>(renderValues[0]);

  return (
    <RenderContext.Provider value={{ window, setWindow, toRender }}>
      <div className={"flex flex-col"}>
        <ScreenPicker />
        <ScreenRenderer />
      </div>
    </RenderContext.Provider>
  );
}
