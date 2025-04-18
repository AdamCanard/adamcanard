"use client";
import { createContext, Dispatch, JSX, SetStateAction, useState } from "react";
import { ScreenPicker } from "./screenpicker";
import { ScreenRenderer } from "./screenrenderer";

interface RenderContextType {
  windowToRender: JSX.Element;
  setWindowToRender: Dispatch<SetStateAction<JSX.Element>>;
  toRender: Record<string, JSX.Element>;
}

//cast empty object to contexttype
export const RenderContext = createContext<RenderContextType>(
  {} as RenderContextType,
);

export function DesktopRenderer(props: {
  toRender: Record<string, JSX.Element>;
}) {
  const renderValues = Object.values(props.toRender);
  const { toRender } = props;
  const [windowToRender, setWindowToRender] = useState<JSX.Element>(
    renderValues[0],
  );
  return (
    <RenderContext.Provider
      value={{ windowToRender, setWindowToRender, toRender }}
    >
      <ScreenPicker />
      <ScreenRenderer />
    </RenderContext.Provider>
  );
}
