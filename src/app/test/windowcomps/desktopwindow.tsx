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
interface IResizeDirection {
  horizontal: number;
  vertical: number;
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
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [point, setPoint] = useState<IPoint>({
    top: top,
    left: left,
    width: props.startingWidth,
    height: props.startingHeight,
  });

  const [locationOffset, setLocationOffset] = useState<ILocationOffset>({
    top: 0,
    left: 0,
  });
  const [widthOffset, setWidthOffset] = useState<number>(0);
  const [heightOffset, setHeightOffset] = useState<number>(0);

  const [direction, setDirection] = useState<IResizeDirection>({
    horizontal: 0,
    vertical: 0,
  });

  const [cursor, setCursor] = useState<string>("grab");

  const handleRightResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 1, vertical: 0 });
    setWidthOffset(e.clientX);
  };
  const handleBottomResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 0, vertical: 1 });
    setHeightOffset(e.clientY);
  };
  const handleLeftResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: -1, vertical: 0 });
    setWidthOffset(e.clientX);
  };
  const handleTopResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 0, vertical: -1 });

    setHeightOffset(e.clientY);
  };
  const widthResizePoint = useCallback(
    (e: MouseEvent) => {
      if (direction.horizontal === -1) {
        setPoint({
          top: point.top,
          left: left + (e.clientX - widthOffset),
          width: width - (e.clientX - widthOffset) / 16,
          height: point.height,
        });
      } else {
        setPoint({
          top: point.top,
          left: point.left,
          width: width + (e.clientX - widthOffset) / 16,
          height: point.height,
        });
      }
    },
    [point, widthOffset, width, direction.horizontal, left],
  );
  const heightResizePoint = useCallback(
    (e: MouseEvent) => {
      if (direction.vertical === -1) {
        setPoint({
          top: top + (e.clientY - heightOffset),
          left: point.left,
          width: point.width,
          height: height - (e.clientY - heightOffset) / 16,
        });
      } else {
        setPoint({
          top: point.top,
          left: point.left,
          width: point.width,
          height: height + (e.clientY - heightOffset) / 16,
        });
      }
    },
    [point, heightOffset, height, direction.vertical, top],
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
    setLeft(point.left);
    setTop(point.top);
    setCursor("grab");
  }, [point.top, point.left]);

  const finishWidthResize = useCallback(() => {
    setWidthOffset(0);
    setWidth(point.width);
    setLeft(point.left);
    setDirection({ horizontal: 0, vertical: 0 });
  }, [point.width, point.left]);

  const finishHeightResize = useCallback(() => {
    setHeightOffset(0);
    setHeight(point.height);
    setTop(point.top);
    setDirection({ horizontal: 0, vertical: 0 });
  }, [point.height, point.top]);

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
    if (+heightOffset != 0) {
      addEventListener("mousemove", heightResizePoint);
      addEventListener("mouseup", finishHeightResize);
    }
    return () => {
      removeEventListener("mousemove", heightResizePoint);
      removeEventListener("mouseup", finishHeightResize);
    };
  }, [heightResizePoint, finishHeightResize, heightOffset]);

  useEffect(() => {
    if (+widthOffset != 0) {
      addEventListener("mousemove", widthResizePoint);
      addEventListener("mouseup", finishWidthResize);
    }
    return () => {
      removeEventListener("mousemove", widthResizePoint);
      removeEventListener("mouseup", finishWidthResize);
    };
  }, [widthResizePoint, finishWidthResize, widthOffset]);

  return (
    <div
      unselectable="on"
      className="flex flex-row justify-center items-center absolute"
      style={{
        top: point.top,
        left: point.left,
        width: `${point.width + 0.5}rem`,
        height: `${point.height + 2.25}rem`,
      }}
    >
      <div
        className={"h-full w-1 bg-red-500 cursor-ew-resize col-start-1"}
        onMouseDown={handleLeftResize}
      ></div>
      <div className={"flex-col"}>
        {" "}
        <div
          className={"h-1 w-full bg-red-500 cursor-ns-resize col-start-1"}
          onMouseDown={handleTopResize}
        ></div>
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
          className={"flex flex-row border-2"}
          style={{
            width: `${point.width}rem`,
            height: `${point.height}rem`,
          }}
        >
          {props.children}
        </div>
        <div
          className={"h-1 w-full bg-red-500 cursor-ns-resize col-start-1"}
          onMouseDown={handleBottomResize}
        ></div>
      </div>
      <div
        className={"h-full w-1 bg-red-500 cursor-ew-resize col-start-1"}
        onMouseDown={handleRightResize}
      ></div>
    </div>
  );
}
