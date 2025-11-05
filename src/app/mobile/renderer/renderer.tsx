"use client";
import { createContext, useEffect, useState } from "react";
import { ScreenPicker } from "./screenpicker";
import { ScreenRenderer } from "./screenrenderer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { library } from "../mobilepage";

interface RenderContextType {
  window: JSX.Element;
  changeWindow: (newWindow: JSX.Element) => void;
  tabs: Record<string, JSX.Element>;
  secretCodeInput: (secretCode: string) => boolean;
}

//cast empty object to contexttype
export const RenderContext = createContext<RenderContextType>(
  {} as RenderContextType,
);

export function Renderer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [tabs, setTabs] = useState<Record<string, JSX.Element>>({
    Info: library["Info"],
  });
  const renderValues = Object.values(tabs);

  const [window, setWindow] = useState<JSX.Element>(() => {
    if (searchParams.has("tab")) {
      const tab = searchParams.get("tab");
      return tabs[tab || ""];
    } else {
      return renderValues[0];
    }
  });

  useEffect(() => {
    if (searchParams.has("tab")) {
      const tab = searchParams.get("tab");
      if (tab !== window.key) {
        setWindow(tabs[tab || ""]);
      }
    } else {
      router.push(pathname + "?" + "tab=" + (window.key || ""));
    }
  }, [pathname, router, searchParams, tabs, window.key]);

  const changeWindow = (newWindow: JSX.Element) => {
    router.push(pathname + "?" + "tab=" + (newWindow.key || ""));
    setWindow(newWindow);
  };

  const secretCodeInput = (secretCode: string) => {
    if (library[secretCode]) {
      const newTabs = { ...tabs };
      newTabs[secretCode] = library[secretCode];
      setTabs(newTabs);
      router.push(pathname + "?" + "tab=" + (secretCode || ""));
      return true;
    } else {
      return false;
    }
  };

  return (
    <RenderContext.Provider
      value={{ window, changeWindow, tabs, secretCodeInput }}
    >
      <ScreenPicker />
      <ScreenRenderer />
    </RenderContext.Provider>
  );
}
