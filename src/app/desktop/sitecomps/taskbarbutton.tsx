"use client";
import { useContext } from "react";
import { TaskbarContext } from "../taskbarcontext";

export function TaskbarButton(props: { window: JSX.Element }) {
  const { openWindow, isOpen } = useContext(TaskbarContext);
  return (
    <div
      id={
        isOpen(props.window.key + "")
          ? "button-taskbar-pressed"
          : "button-taskbar"
      }
      onClick={() => {
        openWindow(props.window);
      }}
    >
      {props.window.key}
    </div>
  );
}
