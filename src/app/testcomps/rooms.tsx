import { useContext, useEffect } from "react";
import { IScreenActions, ScreenContext } from "./gamecontainer";

function ScreenBar() {
  return (
    <div
      className={
        "h-8 w-full bg-black flex justify-around items-center text-white flex-row absolute bottom-0"
      }
    >
      <div>{"Press A to interact"}</div>
      <div>{"Press B to go back"}</div>
    </div>
  );
}

export function Wall() {
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      a: () => console.log("interact"),
      b: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"flex flex-col GridInner"}>
      <div className={"GridSize bg-gray-500"}>
        <ScreenBar />
      </div>
    </div>
  );
}
export function Empty() {
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      a: () => console.log("interact"),
      b: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"flex flex-col GridInner"}>
      <div className={"GridSize bg-black"}>
        <ScreenBar />
      </div>
    </div>
  );
}
export function Chest() {
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      a: () => console.log("interact"),
      b: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"flex flex-col GridInner"}>
      <div className={"GridSize bg-orange-900"}>
        <ScreenBar />
      </div>
    </div>
  );
}

export const start: string[][] = [
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "empty",
    "empty",
    "empty",
    "empty",
    "chest",
    "empty",
    "empty",
    "empty",
    "empty",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
];

export const right: string[][] = [
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
];
export const left: string[][] = [
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  [
    "wall",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "empty",
    "wall",
  ],
  ["wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall", "wall"],
];

export const map: string[][][][] = [
  [[], [], []],
  [left, start, right],
  [[], [], []],
];
