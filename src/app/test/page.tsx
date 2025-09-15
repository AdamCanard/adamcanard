"use client";

import { useContext } from "react";
import TaskBar from "./taskbar";
import { WindowContext } from "./windowprovider";
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

function StartMenu() {
  const { startMenu } = useContext(WindowContext);
  if (startMenu)
    return <div className={"absolute w-96 h-1/2 bg-black bottom-8"}></div>;
}
