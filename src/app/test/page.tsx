"use client";

import { useContext } from "react";
import TaskBar from "./taskbar";
import { WindowContext } from "./windowprovider";
import Windows from "./windows";
import { windowRecord } from "./windowrecord";

export default function Page() {
  return (
    <div className={"w-full h-full flex flex-col relative"}>
      <Windows />
      <StartMenu />
      <TaskBar />
    </div>
  );
}

function StartMenu() {
  const { startMenu } = useContext(WindowContext);
  if (startMenu)
    return (
      <div className={"flex flex-col absolute w-96 h-1/2 bg-blue-500 bottom-8"}>
        <div
          className={"grid grid-cols-3 grid-rows-4 h-full w-full bg-blue-200"}
        >
          {Object.values(windowRecord).map((window) => {
            return (
              <div
                className={"w-full h-full border-2 border-black"}
                key={window.window.key}
              >
                {window.window.key}
              </div>
            );
          })}
        </div>
        <div className={"h-12 bg-black"}></div>
      </div>
    );
}
