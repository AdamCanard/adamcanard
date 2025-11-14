import { useContext, useState } from "react";
import { WindowContext } from "../../windowprovider";
import { IWindow } from "../../records";
import { animationHandler } from "../../utils/animationhandler";

export default function WindowManager() {
  const { activeWindows } = useContext(WindowContext);
  return (
    <div id="border">
      {Object.entries(activeWindows).map(([key, value]) => {
        return (
          <WindowToManage
            windowKey={key}
            window={value}
            key={key + " Manager"}
          />
        );
      })}
    </div>
  );
}

function WindowToManage(props: { windowKey: string; window: IWindow }) {
  const { windowKey } = props;
  const [open, setOpen] = useState<boolean>();

  const animationString = animationHandler(
    "h-12",
    "animate-windowManageOpen h-24",
    "animate-windowManageClose h-12",
    open,
  );
  const toggleOpen = () => {
    if (open === undefined) {
      setOpen(true);
    } else {
      setOpen(!open);
    }
  };
  return (
    <div
      id="border"
      className={`flex flex-row justify-between items-start ${animationString}`}
    >
      <div>{windowKey}</div>

      <button
        className={"w-8 h-8 border-1 border-black"}
        onClick={toggleOpen}
      ></button>
    </div>
  );
}
