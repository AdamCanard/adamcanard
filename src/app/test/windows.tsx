"use client";

import { useContext } from "react";
import { WindowContext } from "./windowprovider";
import DesktopWindow from "./windowcomps/desktopwindow";
import { IWindow } from "./records";

export default function Windows() {
  const { windows } = useContext(WindowContext);
  return (
    <div className={"w-full h-full relative"}>
      {windows.map((window: IWindow) => {
        return (
          <DesktopWindow
            title={window.window.key || ""}
            startingWidth={window.width}
            startingHeight={window.height}
            key={window.window.key}
          >
            {window.window}
          </DesktopWindow>
        );
      })}
    </div>
  );
}
