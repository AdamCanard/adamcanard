"use client";

import { useContext } from "react";
import { RenderContext } from "./renderer";
import { TabButton } from "./tabbutton";

export function ScreenPicker() {
  const { toRender } = useContext(RenderContext);
  return (
    <>
      <div
        className={
          "flex flex-row justify-around items-center w-full gap-2 h-12 bg-accent"
        }
      >
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
    </>
  );
}
