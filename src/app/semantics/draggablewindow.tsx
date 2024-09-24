"use client";
import { useCallback, useEffect, useRef, useState } from "react";

interface IPoint {
  top: number;
  left: number;
}
export default function DraggableWindow(props: {
  title: string;
  children: React.ReactNode;
  width: string;
  heigth: string;
  close?: () => void;
}) {
  const [point, setPoint] = useState<IPoint>({ top: 50, left: 50 });
  const [pointOffset, setPointOffset] = useState<IPoint>({
    top: 0,
    left: 0,
  });
  const boxRef = useRef(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setPointOffset({
      top: e.nativeEvent.offsetY,
      left: e.nativeEvent.offsetX,
    });
    setPoint({
      top: e.pageY - (e.nativeEvent.offsetY + 1),
      left: e.pageX - (e.nativeEvent.offsetX + 1),
    });
  };

  const movePoint = useCallback(
    (e: MouseEvent) => {
      setPoint({
        top: e.pageY - +pointOffset.top,
        left: e.pageX - +pointOffset.left,
      });
    },
    [pointOffset.left, pointOffset.top]
  );

  const resetPoint = () => {
    setPointOffset({
      top: 0,
      left: 0,
    });
  };

  useEffect(() => {
    if (pointOffset.top != 0) {
      addEventListener("mousemove", movePoint);
      addEventListener("mouseup", resetPoint);
      addEventListener("keypress", (e) => {
        if (e.key === "x") {
          // This is optional, recommended if the close button is able to leave window bounds.
          resetPoint();
        }
      });
    }
    return () => {
      removeEventListener("mousemove", movePoint);
      removeEventListener("mouseup", resetPoint);
      removeEventListener("keypress", (e) => {
        if (e.key === "x") {
          resetPoint();
        }
      });
    };
  }, [movePoint, pointOffset]);

  return (
    <>
      <div
        unselectable="on"
        className={`flex flex-col justify-center items-center w-${props.width} h-${props.heigth} absolute`}
        ref={boxRef}
        style={point}
      >
        <div className="flex justify-between w-full relative">
          <h1
            id="title"
            className="hover:cursor-pointer w-full"
            onMouseDown={handleMouseDown}
          >
            {props.title}
          </h1>
          {props.close && (
            <div id="close-dr" className="absolute" onClick={props.close}></div>
          )}
        </div>

        <div id="window">{props.children}</div>
      </div>
    </>
  );
}
