"use client";
import { useContext } from "react";
import DraggableWindow from "../semanticcomps/draggablewindow";
import { TaskbarContext } from "../layout";

export default function DesktopWindow(props: {
  title: string;
  width: string;
  height: string;
  children: React.ReactNode;
  close?: () => void;
}) {
  const { windows, setWindows } = useContext(TaskbarContext);

  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == props.title) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };
  return (
    <DraggableWindow
      title={props.title}
      width={props.width}
      height={props.height}
      windowKey={props.title}
      close={props.close === undefined ? handleClose : props.close}
    >
      {props.children}
    </DraggableWindow>
  );
}
