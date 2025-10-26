import {
  ReactElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { WindowContext } from "../windowprovider";
import Image from "next/image";
import CloseSrc from "../../../../public/Windows/xp/tile_close_white.png";
import MaximizeSrc from "../../../../public/Windows/xp/tile_maximize_white.png";
import MinimizeSrc from "../../../../public/Windows/xp/tile_minimize_white.png";

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

  //Reference variables for changing size and location
  const [width, setWidth] = useState(props.startingWidth);
  const [height, setHeight] = useState(props.startingHeight);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  //Active size and Location of window
  const [point, setPoint] = useState<IPoint>({
    top: top,
    left: left,
    width: props.startingWidth,
    height: props.startingHeight,
  });

  //Difference in reference and active values
  const [locationOffset, setLocationOffset] = useState<ILocationOffset>({
    top: 0,
    left: 0,
  });
  const [sizeOffset, setSizeOffset] = useState<ISizeOffset>({
    width: 0,
    height: 0,
  });

  const resetOffsets = () => {
    setSizeOffset({ width: 0, height: 0 });
    setLocationOffset({
      top: 0,
      left: 0,
    });
    setDirection({ horizontal: 0, vertical: 0 });
  };

  //Track the direction of size change
  const [direction, setDirection] = useState<IResizeDirection>({
    horizontal: 0,
    vertical: 0,
  });

  //Easily update cursor display
  const [cursor, setCursor] = useState<string>("grab");

  //MouseDown functions for borders
  const handleRightResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 1, vertical: 0 });
    setSizeOffset({ width: e.clientX, height: 0 });
  };
  const handleBottomResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 0, vertical: 1 });
    setSizeOffset({ width: 0, height: e.clientY });
  };
  const handleLeftResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: -1, vertical: 0 });
    setSizeOffset({ width: e.clientX, height: 0 });
  };
  const handleTopResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 0, vertical: -1 });
    setSizeOffset({ width: 0, height: e.clientY });
  };

  //MouseDown for diagonal rezise
  const handleTopRightResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: 1, vertical: -1 });
    setSizeOffset({ width: e.clientX, height: e.clientY });
  };
  const handleBottomRightResize = (e: React.MouseEvent<HTMLElement>) => {
    console.log("fire");
    setDirection({ horizontal: 1, vertical: 1 });
    setSizeOffset({ width: e.clientX, height: e.clientY });
  };

  const handleTopLeftResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: -1, vertical: -1 });
    setSizeOffset({ width: e.clientX, height: e.clientY });
  };
  const handleBottomLeftResize = (e: React.MouseEvent<HTMLElement>) => {
    setDirection({ horizontal: -1, vertical: 1 });
    setSizeOffset({ width: e.clientX, height: e.clientY });
  };

  const resizePoint = useCallback(
    (e: MouseEvent) => {
      const newPoint = { ...point };

      if (direction.horizontal === 1) {
        if (width + (e.clientX - sizeOffset.width) / 16 >= 0)
          newPoint.width = width + (e.clientX - sizeOffset.width) / 16;
      }
      if (direction.horizontal === -1) {
        if (width - (e.clientX - sizeOffset.width) / 16 >= 0) {
          newPoint.left = left + (e.clientX - sizeOffset.width);
          newPoint.width = width - (e.clientX - sizeOffset.width) / 16;
        }
      }
      if (direction.vertical === 1) {
        if (height + (e.clientY - sizeOffset.height) / 16) {
          newPoint.height = height + (e.clientY - sizeOffset.height) / 16;
        }
      }

      if (direction.vertical === -1) {
        if (height - (e.clientY - sizeOffset.height) / 16) {
          newPoint.top = top + (e.clientY - sizeOffset.height);
          newPoint.height = height - (e.clientY - sizeOffset.height) / 16;
        }
      }

      setPoint(newPoint);
    },
    [direction, height, width, left, top, point, sizeOffset],
  );

  //MouseDown function for draggable div
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
  //Runs continuously while user grabs draggable div || while locationOffset != 0
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

  //resets for each action
  const resetPoint = useCallback(() => {
    resetOffsets();
    setLeft(point.left);
    setTop(point.top);
    resetOffsets();
    setCursor("grab");
  }, [point.top, point.left]);

  const finishResize = useCallback(() => {
    setTop(point.top);
    setLeft(point.left);
    setWidth(point.width);
    setHeight(point.height);
    resetOffsets();
  }, [point]);

  //useEffect watchers for move movement after mousedown
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
    if (sizeOffset.height !== 0 || sizeOffset.width !== 0) {
      addEventListener("mousemove", resizePoint);
      addEventListener("mouseup", finishResize);
    }
    return () => {
      removeEventListener("mousemove", resizePoint);
      removeEventListener("mouseup", finishResize);
    };
  }, [resizePoint, finishResize, sizeOffset]);

  return (
    <div
      unselectable="on"
      className="flex flex-row justify-center items-center absolute"
      style={{
        top: point.top,
        left: point.left,
        width: `${point.width - 0.4}rem`,
        height: `${point.height + 1.5}rem`,
      }}
    >
      <div className={"flex flex-col w-1 h-full "}>
        <div
          className={"h-2 w-2 cursor-nwse-resize"}
          onMouseDown={handleTopLeftResize}
        ></div>
        <div
          className={"h-full w-1 cursor-ew-resize"}
          onMouseDown={handleLeftResize}
        ></div>
        <div
          className={"h-2 w-2 cursor-sw-resize"}
          onMouseDown={handleBottomLeftResize}
        ></div>
      </div>

      <div className={"flex-col "}>
        <div
          className={"h-1 w-full cursor-ns-resize "}
          onMouseDown={handleTopResize}
        ></div>
        <div className={"flex flex-col rounded-t-md contain-paint"}>
          <div className="WindowTile flex justify-between w-full relative ">
            <h1
              className={
                "flex w-full h-6 font-trebuchet font-bold items-center"
              }
              style={{ cursor: cursor }}
              onMouseDown={handleMouseMove}
            >
              {props.title}
            </h1>
            <div className={"flex relative w-24 gap-1"}>
              <div
                className="MinimizeTile rounded-sm relative flex justify-start items-end p-1 cursor-pointer"
                onClick={() => closeWindow(props.children.key || "")}
              >
                <Image
                  src={MinimizeSrc}
                  width={9}
                  height={18}
                  alt="Minimize Button"
                  draggable={false}
                />
              </div>{" "}
              <div
                className="FullscreenTile rounded-sm relative flex justify-center items-center cursor-pointer"
                onClick={() => closeWindow(props.children.key || "")}
              >
                <Image
                  src={MaximizeSrc}
                  width={18}
                  height={18}
                  alt="Maximize Button"
                  draggable={false}
                />
              </div>
              <div
                className="CloseTile rounded-sm relative flex justify-center items-center cursor-pointer"
                onClick={() => closeWindow(props.children.key || "")}
              >
                <Image
                  src={CloseSrc}
                  width={18}
                  height={18}
                  alt="Close Button"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div
            className={"flex flex-col "}
            style={{
              width: `${point.width}rem`,
              height: `${point.height}rem`,
            }}
          >
            {props.children}
          </div>
        </div>
        <div
          className={"h-1 w-full  cursor-ns-resize "}
          onMouseDown={handleBottomResize}
        ></div>
      </div>
      <div className={"flex flex-col w-1 h-full"}>
        <div
          className={"h-2 w-2  cursor-nesw-resize"}
          onMouseDown={handleTopRightResize}
        ></div>
        <div
          className={"h-full w-1  cursor-ew-resize "}
          onMouseDown={handleRightResize}
        ></div>
        <div
          className={"h-2 w-2  cursor-nwse-resize"}
          onMouseDown={handleBottomRightResize}
        ></div>
      </div>
    </div>
  );
}
