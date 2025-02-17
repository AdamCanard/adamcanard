"use client";

import { useContext } from "react";
import { RenderContext } from "./renderer";
import { TabButton } from "./tabbutton";

export function ScreenPicker() {
  const { toRender } = useContext(RenderContext);
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between "}>
        <div className={"w-full h-8 flex flex-row"}>
          {Object.keys(toRender).map((title: string, index: number) => {
            return (
              <TabButton
                title={title}
                set={Object.values(toRender)[index]}
                key={title}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
