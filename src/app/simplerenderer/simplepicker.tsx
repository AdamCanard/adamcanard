"use client";

import { useContext } from "react";
import { RenderContext } from "./simplerenderer";
import { SimpleTab } from "./simpletab";

export function SimplePicker() {
  const { tabs } = useContext(RenderContext);
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between h-8"}>
        <div className={"w-full h-8 flex flex-row"}>
          {Object.keys(tabs).map((title: string, index: number) => {
            return (
              <SimpleTab
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
