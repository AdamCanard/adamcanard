"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { ScreenPicker } from "./screenpicker";
import { ScreenRenderer } from "./screenrenderer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { tabLibrary } from "../mobilepage";

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

export function Renderer(props: { startingTabs: Record<string, JSX.Element> }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [tabs, setTabs] = useState<Record<string, JSX.Element>>(
    props.startingTabs,
  );
  const renderValues = Object.values(tabs);

  const addLocalTab = (tab: string) => {
    const localTabs = localStorage.getItem("tabs");
    if (localTabs === null) {
      localStorage.setItem("tabs", JSON.stringify([tab]));
    } else {
      const tabArray = JSON.parse(localTabs);
      tabArray.push(tab);
      localStorage.setItem("tabs", JSON.stringify(tabArray));
    }
  };

  const addTabToTabs = useCallback(
    (newTab: string) => {
      const newTabs = { ...tabs };
      newTabs[newTab] = tabLibrary[newTab];
      setTabs(newTabs);
      addLocalTab(newTab);
    },
    [tabs],
  );

  const [window, setWindow] = useState<JSX.Element>(() => {
    if (searchParams.has("tab")) {
      const tab = searchParams.get("tab");
      if (tabs[tab || ""]) {
        return tabs[tab || ""];
      } else {
        addTabToTabs(tab || "");
        return <></>;
      }
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
  }, [pathname, router, searchParams, tabs]);

  const changeWindow = (newWindow: JSX.Element) => {
    router.push(pathname + "?" + "tab=" + (newWindow.key || ""));
    setWindow(newWindow);
  };

  const secretCodeInput = (secretCode: string) => {
    if (tabLibrary[secretCode]) {
      addLocalTab(secretCode);
      const newTabs = { ...tabs };
      newTabs[secretCode] = tabLibrary[secretCode];
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
