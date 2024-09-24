import { useCallback, useEffect, useRef, useState } from "react";

interface IPoint {
  top: number;
  left: number;
}

export function Draggable(props: { children: React.ReactNode }) {
  const [point, setPoint] = useState<IPoint>({ top: 60, left: 30 });
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
        ref={boxRef}
        className={
          "absolute border border-black bg-white select-none transition:w"
        }
        style={point}
      >
        <div
          className={
            "w-full border-b bg-gray-300 border-black select-none flex justify-end resize ltr:resize"
          }
          onMouseDown={handleMouseDown}
        >
          {props.children}
        </div>
      </div>
    </>
  );
}
