"use client";
// import { Draggable } from "./semantics/draggable";
import DraggableWindow from "./semantics/draggablewindow";
// import Window from "./semantics/window";

export default function Test() {
  return (
    <div className="w-full h-full">
      <DraggableWindow title="Test Window" size={"s"}>
        <></>
      </DraggableWindow>
    </div>
  );
}
