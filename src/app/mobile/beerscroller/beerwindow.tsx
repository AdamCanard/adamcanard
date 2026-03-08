"use client";
import { TouchEvent, useCallback, useEffect, useState } from "react";

//interface IPoint {
//  top: number;
//  left: number;
//  width?: string;
//  height?: string;
//  windowKey?: string;
//}

export default function BeerWindow(props: { children: JSX.Element }) {
  const [top, setTop] = useState<number>(0);
  const [topOffset, setTopOffset] = useState<number>(0);
  const handleTouch = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    const touch = e.touches.item(0);

    setTopOffset(touch.clientY);
  };

  const moveTouch = useCallback(
    (e: globalThis.TouchEvent) => {
      const touch = e.touches.item(0);
      if (touch) {
        setTop(touch.clientY - topOffset);
      }
    },
    [topOffset],
  );

  const resetPoint = useCallback(() => {
    if (top > 200) {
      alert("Back");
    } else if (top < -200) {
      alert("Next");
    }
    setTopOffset(0);
    setTop(0);
  }, [top]);

  useEffect(() => {
    if (topOffset !== 0) {
      addEventListener("touchmove", moveTouch);
      addEventListener("touchend", resetPoint);
    }
    return () => {
      removeEventListener("touchmove", moveTouch);
      removeEventListener("touchend", resetPoint);
    };
  }, [moveTouch, resetPoint, topOffset]);

  return (
    <div
      className="flex-col justify-center items-center absolute cursor-pointer border-2 w-full h-full"
      style={{ top: top }}
      onTouchStart={(e) => handleTouch(e)}
    >
      {props.children}
    </div>
  );
}
