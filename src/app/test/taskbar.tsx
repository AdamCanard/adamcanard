import { useContext } from "react";
import { WindowContext } from "./windowprovider";
import { IWindow } from "./windowrecord";
import Image from "next/image";

export default function TaskBar() {
  const { windows, closeWindow } = useContext(WindowContext);
  return (
    <div className={"w-full h-8 bg-blue-400"}>
      {" "}
      {windows.map((window: IWindow) => {
        return (
          <div
            onClick={() => closeWindow(window.window.key || "")}
            key={window.window.key}
            className={
              "flex flex-row bg-blue-300 w-36 h-full p-2 gap-2 items-center"
            }
          >
            <div className={"relative h-full w-1/8"}>
              {" "}
              <Image
                src={window.icon}
                alt={window.window.key + " Icon"}
                fill={true}
              />
            </div>

            <p>{window.window.key}</p>
          </div>
        );
      })}
    </div>
  );
}
