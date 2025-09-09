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
interface ILocationOffset {
  top: number;
  left: number;
}
interface ISizeOffset {
  width: number;
  height: number;
}

export default function DesktopWindow(props: {
  title: string;
  children: ReactElement;
  startingWidth: number;
  startingHeight: number;
}) {
  const { closeWindow } = useContext(WindowContext);

  const [width, setWidth] = useState(props.startingWidth);
  const [height, setHeight] = useState(props.startingHeight);

  const [point, setPoint] = useState<IPoint>({
    top: 0,
    left: 0,
    width: props.startingWidth,
    height: props.startingHeight,
  });

  const [locationOffset, setLocationOffset] = useState<ILocationOffset>({
    top: 0,
    left: 0,
  });
  const [sizeOffset, setSizeOffset] = useState<ISizeOffset>({
    width: 0,
    height: 0,
  });

  const [cursor, setCursor] = useState<string>("grab");

  const handleMouseResize = (e: React.MouseEvent<HTMLElement>) => {
    setSizeOffset({
      width: e.clientX,
      height: e.clientY,
    });
  };
  const resizePoint = useCallback(
    (e: MouseEvent) => {
      setPoint({
        top: point.top,
        left: point.left,
        width: width + (e.clientX - sizeOffset.width) / 16,
        height: height + (e.clientY - sizeOffset.height) / 16,
      });
    },
    [point, sizeOffset, width, height],
  );
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    setCursor("grabbing");
    setLocationOffset({
      top: e.nativeEvent.offsetY,
      left: e.nativeEvent.offsetX,
    });
    setPoint({
      top: e.pageY - e.nativeEvent.offsetY,
      left: e.pageX - e.nativeEvent.offsetX,
      width: point.width,
      height: point.height,
    });
  };

  const movePoint = useCallback(
    (e: MouseEvent) => {
      setPoint({
        top: e.pageY - +locationOffset.top,
        left: e.pageX - +locationOffset.left,
        width: point.width,
        height: point.height,
      });
    },
    [locationOffset.left, locationOffset.top, point.width, point.height],
  );

  const resetPoint = useCallback(() => {
    setLocationOffset({
      top: 0,
      left: 0,
    });
    setCursor("grab");
  }, []);

  const confirmPoint = useCallback(() => {
    setSizeOffset({
      width: 0,
      height: 0,
    });
    setWidth(point.width);
    setHeight(point.height);
  }, [point.width, point.height]);

  useEffect(() => {
    if (+locationOffset.top != 0) {
      addEventListener("mousemove", movePoint);
      addEventListener("mouseup", resetPoint);
    }
    return () => {
      removeEventListener("mousemove", movePoint);
      removeEventListener("mouseup", resetPoint);
    };
  }, [movePoint, locationOffset, resetPoint]);

  useEffect(() => {
    if (+sizeOffset.width != 0) {
      addEventListener("mousemove", resizePoint);
      addEventListener("mouseup", confirmPoint);
    }
    return () => {
      removeEventListener("mousemove", resizePoint);
      removeEventListener("mouseup", confirmPoint);
    };
  }, [sizeOffset, resizePoint, confirmPoint]);

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
      <div className="flex justify-between w-full relative ">
        <h1
          className={"w-full h-8 bg-blue-500"}
          style={{ cursor: cursor }}
          onMouseDown={handleMouseMove}
        >
          {props.title}
        </h1>
        <div
          id="close-dr"
          className="absolute"
          onClick={() => closeWindow(props.title)}
        ></div>
      </div>

      <div
        className={"flex flex-row"}
        style={{
          border: "2px black solid",
          width: `${point.width}rem`,
          height: `${point.height}rem`,
        }}
      >
        {props.children}
        <div
          className={"h-full w-2 bg-red-500"}
          onMouseDown={handleMouseResize}
        ></div>
      </div>
    </div>
  );
}
