function ScreenBar() {
  return (
    <div
      className={
        "h-8 w-full bg-black flex justify-around items-center text-white flex-row"
      }
    >
      <div>{"Press A to interact"}</div>
      <div>{"Press B to go back"}</div>
    </div>
  );
}

function Wall() {
  return (
    <div className={"flex flex-col h-full w-full"}>
      <div className={"h-full w-full bg-gray-500"}></div>
      <ScreenBar />
    </div>
  );
}
function Empty() {
  return (
    <div className={"flex flex-col h-full w-full"}>
      <div className={"h-full w-full bg-black"}></div>
      <ScreenBar />
    </div>
  );
}
function Chest() {
  return (
    <div className={"flex flex-col h-full w-full"}>
      <div className={"h-full w-full bg-orange-900"}></div>
      <ScreenBar />
    </div>
  );
}

const wall: Record<string, JSX.Element> = {
  W: <Wall />,
};
const empty: Record<string, JSX.Element> = {
  E: <Empty />,
};

const chest: Record<string, JSX.Element> = {
  C: <Chest />,
};

export const start: Record<string, JSX.Element>[][] = [
  [wall, wall, wall, wall, empty, wall, wall, wall, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [empty, empty, empty, empty, chest, empty, empty, empty, empty],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, wall, wall, wall, empty, wall, wall, wall, wall],
];

export const right: Record<string, JSX.Element>[][] = [
  [wall, wall, wall, wall, wall, wall, wall, wall, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [empty, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, wall, wall, wall, wall, wall, wall, wall, wall],
];
export const left: Record<string, JSX.Element>[][] = [
  [wall, wall, wall, wall, wall, wall, wall, wall, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, empty],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, empty, empty, empty, empty, empty, empty, empty, wall],
  [wall, wall, wall, wall, wall, wall, wall, wall, wall],
];

export const map: Record<string, JSX.Element>[][][][] = [
  [[], [], []],
  [left, start, right],
  [[], [], []],
];
