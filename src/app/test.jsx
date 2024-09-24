"use client";
import { Draggable } from "./semantics/draggable";
import Window from "./semantics/window";

export default function Test() {
  return (
    <Draggable>
      <Window title="Test">
        <></>
      </Window>
    </Draggable>
  );
}
