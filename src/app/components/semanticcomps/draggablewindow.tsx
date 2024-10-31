"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { TaskbarContext } from "../sitecomps/toplevel";

interface IPoint {
  top: number;
  left: number;
  width?: string;
  height?: string;
}
interface ICursor {
  cursor: string;
}
export default function DraggableWindow(props: {
  title: string;
  children: React.ReactNode;
  width: string;
  height: string;
  windowKey: string;
  close?: () => void;
}) {
  const [point, setPoint] = useState<IPoint>({
    top: 50,
    left: 50,
    width: props.width,
    height: props.height,
  });
  const [pointOffset, setPointOffset] = useState<IPoint>({
    top: 0,
    left: 0,
  });
  const [cursor, setCursor] = useState<ICursor>({
    cursor: "grab",
  });
  const { windows, setWindows } = useContext(TaskbarContext);

  const raiseWindow = () => {
    const windowIndex = windows.findIndex(
      (element) => element.key == props.windowKey,
    );
    const windowHolder = windows[windowIndex];
    const newWindows = windows.toSpliced(windowIndex, 1);
    setWindows([...newWindows, windowHolder]);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setCursor({ cursor: "grabbing" });
    raiseWindow();
    setPointOffset({
      top: e.nativeEvent.offsetY,
      left: e.nativeEvent.offsetX,
    });
    setPoint({
      top: e.pageY - (e.nativeEvent.offsetY + 2),
      left: e.pageX - (e.nativeEvent.offsetX + 2),
      width: props.width,
      height: props.height,
    });
  };

  const movePoint = useCallback(
    (e: MouseEvent) => {
      setPoint({
        top: e.pageY - +pointOffset.top,
        left: e.pageX - +pointOffset.left,
        width: props.width,
        height: props.height,
      });
    },
    [pointOffset.left, pointOffset.top, props.height, props.width],
  );

  const resetPoint = () => {
    setPointOffset({
      top: 0,
      left: 0,
    });
    setCursor({ cursor: "grab" });
  };

  useEffect(() => {
    if (pointOffset.top != 0) {
      addEventListener("mousemove", movePoint);
      addEventListener("mouseup", resetPoint);
    }
    return () => {
      removeEventListener("mousemove", movePoint);
      removeEventListener("mouseup", resetPoint);
    };
  }, [movePoint, pointOffset]);

  const handleClick = () => {
    {
      props.close && props.close();
    }
  };

  return (
    <>
      <div
        unselectable="on"
        className="flex flex-col justify-center items-center absolute"
        style={point}
      >
        <div id="window">
          <div className="flex justify-between w-full relative">
            <h1
              id="title"
              className=" w-full"
              style={cursor}
              onMouseDown={handleMouseDown}
            >
              {props.title}
            </h1>
            {props.close && (
              <div
                id="close-dr"
                className="absolute"
                onClick={handleClick}
              ></div>
            )}
          </div>
          {props.children}
        </div>
      </div>
    </>
  );
}
