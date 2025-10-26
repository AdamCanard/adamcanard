"use client";
import { createContext, useEffect, useState } from "react";
import { ScreenPicker } from "./screenpicker";
import { ScreenRenderer } from "./screenrenderer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface RenderContextType {
  window: JSX.Element;
  changeWindow: (newWindow: JSX.Element) => void;
  toRender: Record<string, JSX.Element>;
}

//cast empty object to contexttype
export const RenderContext = createContext<RenderContextType>(
  {} as RenderContextType,
);

export function Renderer(props: { toRender: Record<string, JSX.Element> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { toRender } = props;
  const renderValues = Object.values(props.toRender);

  const [window, setWindow] = useState<JSX.Element>(() => {
    if (searchParams.has("tab")) {
      const tab = searchParams.get("tab");
      return toRender[tab || ""];
    } else {
      return renderValues[0];
    }
  });

  useEffect(() => {
    if (searchParams.has("tab")) {
      const tab = searchParams.get("tab");
      if (tab !== window.key) {
        setWindow(toRender[tab || ""]);
      }
      console.log(window.key, tab);
    } else {
      router.push(pathname + "?" + "tab=" + (window.key || ""));
    }
  }, [pathname, router, searchParams, toRender, window.key]);

  const changeWindow = (newWindow: JSX.Element) => {
    router.push(pathname + "?" + "tab=" + (newWindow.key || ""));
    setWindow(newWindow);
  };
  return (
    <RenderContext.Provider value={{ window, changeWindow, toRender }}>
      <ScreenPicker />
      <ScreenRenderer />
    </RenderContext.Provider>
  );
}
