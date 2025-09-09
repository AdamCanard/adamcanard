"use client";

import { ReactElement, useContext } from "react";
import { WindowContext } from "./windowprovider";
import DesktopWindow from "./windowcomps/desktopwindow";

export default function Windows() {
  const { windows } = useContext(WindowContext);
  return (
    <div className={"w-full h-full relative"}>
      {windows.map((window: ReactElement) => {
        return (
          <DesktopWindow
            title={window.key || ""}
            startingWidth={16}
            startingHeight={16}
            key={window.key}
          >
            {window}
          </DesktopWindow>
        );
      })}
    </div>
  );
}
