"use client";

import { useContext } from "react";
import { RenderContext } from "./renderer";
import { TabButton } from "./tabbutton";

export function ScreenPicker() {
  const { tabs } = useContext(RenderContext);
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between h-8"}>
        <div className={"w-full h-8 flex flex-row"}>
          {Object.keys(tabs).map((title: string, index: number) => {
            return (
              <TabButton
                title={title}
                set={Object.values(tabs)[index]}
                key={title}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
