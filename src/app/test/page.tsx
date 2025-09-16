"use client";

import { useContext } from "react";
import TaskBar from "./taskbar";
import { WindowContext } from "./windowprovider";
import Windows from "./windows";
import { StartMenuRecord, WindowRecord } from "./windowrecord";

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
        <div className={"h-18 bg-black"}></div>
        <div className={"flex flex-row h-full w-full  relative"}>
          <div className={"flex flex-col h-full w-full gap-2 bg-white "}>
            {Object.values(WindowRecord).map((window) => {
              return (
                <div
                  className={"w-full h-12 border-2 hover:bg-blue-500"}
                  key={window.window.key}
                >
                  {window.window.key}
                </div>
              );
            })}
          </div>

          <div className={"h-full w-full"}>
            <div
              className={
                "flex flex-col h-full w-full gap-2 justify-end bg-blue-200"
              }
            >
              {Object.values(StartMenuRecord).map((window) => {
                return (
                  <div
                    className={"w-full h-12 border-2 hover:bg-blue-500"}
                    key={window.window.key}
                  >
                    {window.window.key}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={"h-12 bg-black"}></div>
      </div>
    );
}
