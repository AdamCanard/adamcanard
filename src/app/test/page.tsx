"use client";

import TaskBar from "./taskbar";
import Windows from "./windows";

export default function Page() {
  return (
    <div className={"w-full h-full flex flex-col"}>
      <Windows />
      <TaskBar />
    </div>
  );
}
