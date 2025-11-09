"use client";

import StartMenu from "./startmenu";
import TaskBar from "./taskbar";
import Windows from "./windows";

export default function Page() {
  return (
    <div className={"w-full h-full flex flex-col relative"}>
      <Windows />
      <StartMenu />
      <TaskBar />
    </div>
  );
}
