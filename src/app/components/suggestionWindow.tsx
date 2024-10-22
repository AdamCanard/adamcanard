"use client";

import { useContext } from "react";

import { TaskbarContext } from "./sitecomps/toplevel";
import DraggableWindow from "./semanticcomps/draggablewindow";
import Suggest from "../mobile/suggest";

export default function Suggestion() {
  const { windows, setWindows } = useContext(TaskbarContext);

  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "Suggestion") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  return (
    <DraggableWindow
      title={"New Suggestion"}
      width={"72"}
      heigth={"2/3"}
      windowKey="Suggestion"
      close={handleClose}
    >
      <Suggest />
    </DraggableWindow>
  );
}
