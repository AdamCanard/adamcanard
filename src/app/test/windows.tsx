"use client";

import { useContext } from "react";
import { WindowContext } from "./windowprovider";
import DesktopWindow from "./windowcomps/desktopwindow";
import { IWindow } from "./records";

export default function Windows() {
  const { activeWindows } = useContext(WindowContext);
  return (
    <div className={"w-full h-full relative"}>
      {Object.values(activeWindows).map((window: IWindow) => {
        if (!window.minimized)
          return (
            <DesktopWindow window={window} key={window.window.key}>
              {window.window}
            </DesktopWindow>
          );
      })}
    </div>
  );
}
