import { useContext, useState } from "react";
import { WindowContext } from "../../windowprovider";
import { IWindow } from "../../records";

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
  const [open, setOpen] = useState(false);
  const [animationString, setAnimationString] = useState("");

  const animationRecord = {
    false: "animate-windowManageClose",
    true: "animate-windowManageOpen",
  };
  const toggleOpen = () => {
    setOpen(!open);
    if (!open) {
      setAnimationString(animationRecord.true);
    } else {
      setAnimationString(animationRecord.false);
    }
  };
  //${open ? "animate-windowManageOpen h-24" : "animate-windowManageClose h-12"}
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

//<label>
//  location:
//  <div>
//    ({value.top}, {value.left})
//  </div>
//</label>;
