"use client";
import { TouchEvent, useCallback, useEffect, useState } from "react";

interface IPoint {
  top: number;
  left: number;
  width?: string;
  height?: string;
  windowKey?: string;
}

export default function BeerWindow(props: { children: JSX.Element }) {
  const [point, setPoint] = useState<IPoint>({
    top: 0,
    left: 0,
  });
  const [pointOffset, setPointOffset] = useState<IPoint>({
    top: 0,
    left: 0,
  });
  const handleTouch = (e: TouchEvent<HTMLDivElement>) => {
    e.preventDefault();
    alert(e.touches.item(0).clientY);
    //setPointOffset({
    //  top: e.nativeEvent.offsetY,
    //  left: e.nativeEvent.offsetX,
    //});
    //setPoint({
    //  top: e.pageY - (e.nativeEvent.offsetY + 2),
    //  left: e.pageX - (e.nativeEvent.offsetX + 2),
    //});
  };

  const movePoint = useCallback(
    (e: MouseEvent) => {
      setPoint({
        top: e.pageY - +pointOffset.top,
        left: e.pageX - +pointOffset.left,
      });
    },
    [pointOffset.left, pointOffset.top],
  );

  const resetPoint = useCallback(() => {
    setPointOffset({
      top: 0,
      left: 0,
    });
  }, []);

  useEffect(() => {
    if (+pointOffset.top != 0) {
      addEventListener("mousemove", movePoint);
      addEventListener("mouseup", resetPoint);
    }
    return () => {
      removeEventListener("mousemove", movePoint);
      removeEventListener("mouseup", resetPoint);
    };
  }, [movePoint, pointOffset, resetPoint]);

  return (
    <div
      className=" flex-col justify-center items-center absolute cursor-pointer border-2"
      style={point}
      onTouchStart={(e) => handleTouch(e)}
    >
      {props.children}
    </div>
  );
}
