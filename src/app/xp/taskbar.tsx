import { useContext } from "react";
import { WindowContext } from "./windowprovider";
import { IWindow } from "./records";
import Image from "next/image";
import WindowsXP from "../../../public/Windows/Windows XP.png";

export default function TaskBar() {
  const { activeWindows } = useContext(WindowContext);
  return (
    <div className={"w-full h-8 bg-blue-400 flex"}>
      <StartButton />
      {Object.values(activeWindows).map((window: IWindow) => {
        return <Tab window={window} key={window.window.key} />;
      })}
    </div>
  );
}

function StartButton() {
  const { toggleStartMenu } = useContext(WindowContext);
  return (
    <div
      className={
        "flex flex-row w-24 h-full p-2 items-center bg-green-500 gap-2 cursor-pointer"
      }
      onClick={toggleStartMenu}
    >
      <div className={"relative h-full w-1/4"}>
        <Image src={WindowsXP} alt={"Windows Icon"} fill={true} />
      </div>

      <p>Start</p>
    </div>
  );
}

function Tab(props: { window: IWindow }) {
  const { toggleMinimize } = useContext(WindowContext);
  const { window } = props;
  return (
    <div
      onClick={() => toggleMinimize(window.window.key || "")}
      className={`flex flex-row ${window.minimized ? "bg-blue-500" : "bg-blue-300"} w-36 h-full p-2 gap-2 items-center`}
    >
      <div className={"relative h-full w-1/8"}>
        <Image
          src={window.icon}
          alt={window.window.key + " Icon"}
          fill={true}
        />
      </div>

      <p>{window.window.key}</p>
    </div>
  );
}
