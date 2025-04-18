"use client";

import { useContext } from "react";
import { RenderContext } from "./renderer";
import { TabButton } from "./tabbutton";

export function ScreenPicker() {
  const { toRender } = useContext(RenderContext);
  return (
    <>
      <div className={"flex flex-row justify-center w-48 h-full"}>
        <div className={"w-36 flex flex-col h-full justify-around"}>
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
