import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { WindowContext } from "../windowprovider";

interface IPoint {
  top: number;
  left: number;
  width: number;
  height: number;
}
interface IPointOffset {
  top: number;
  left: number;
}
export default function DesktopWindow(props: {
  title: string;
  children: ReactElement;
  startingWidth: number;
  startingHeight: number;
}) {
  const { closeWindow } = useContext(WindowContext);

  const [width] = useState<number>(props.startingWidth);
  const [height] = useState<number>(props.startingHeight);
  const [point, setPoint] = useState<IPoint>({
    top: 0,
    left: 0,
    width: width,
    height: height,
  });

  const [pointOffset, setPointOffset] = useState<IPointOffset>({
    top: 0,
    left: 0,
  });
  const [cursor, setCursor] = useState<string>("grab");

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    setCursor("grabbing");
    setPointOffset({
      top: e.nativeEvent.offsetY,
      left: e.nativeEvent.offsetX,
    });
    setPoint({
      top: e.pageY - e.nativeEvent.offsetY,
      left: e.pageX - e.nativeEvent.offsetX,
      width: width,
      height: height,
    });
  };

  const movePoint = useCallback(
    (e: MouseEvent) => {
      setPoint({
        top: e.pageY - +pointOffset.top,
        left: e.pageX - +pointOffset.left,
        width: width,
        height: height,
      });
    },
    [pointOffset.left, pointOffset.top, height, width],
  );

  const resetPoint = useCallback(() => {
    setPointOffset({
      top: 0,
      left: 0,
    });
    setCursor("grab");
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
      unselectable="on"
      className="flex flex-col justify-center items-center absolute"
      style={{
        top: point.top,
        left: point.left,
        width: `${point.width}rem`,
        height: `${point.height + 2}rem`,
      }}
    >
      <div
        className="flex justify-between w-full relative h-8 bg-blue-500"
        style={{ cursor: cursor }}
        onMouseDown={handleMouseDown}
      >
        <h1>{props.title}</h1>

        <div
          id="close-dr"
          className="absolute"
          onClick={() => closeWindow(props.title)}
        ></div>
      </div>

      <div
        style={{
          border: "2px black solid",
          width: `${width}rem`,
          height: `${height}rem`,
        }}
      >
        {props.children}
      </div>
    </div>
  );
}
