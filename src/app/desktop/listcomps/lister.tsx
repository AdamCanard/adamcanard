import { useContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import List from "./list";
import { TaskbarContext } from "../layout";

export default function Lister() {
  const { windows, setWindows } = useContext(TaskbarContext);

  const handleClick = (window: JSX.Element) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == window.key) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
        return;
      }
    }
    setWindows([...windows, window]);
  };

  const randomOutput = (data: never[]) => {
    alert(Object.values(data[Math.floor(Math.random() * data.length)])[0]);
  };
  return (
    <DesktopWindow title="Lists" width={"8rem"} height={""}>
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Beer"
              api="/api/Beer/"
              key={"Beer"}
              adminNeeded={true}
              submit={() => {}}
              actionNeeded={false}
            />,
          )
        }
      >
        Drank
      </div>{" "}
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Suggestion"
              api="/api/suggestion/"
              key={"Suggestion"}
              adminNeeded={false}
              submit={() => {}}
              actionNeeded={false}
            />,
          )
        }
      >
        Suggestion
      </div>{" "}
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(
            <List
              title="Ideas"
              api="/api/idea/"
              key={"Ideas"}
              adminNeeded={true}
              submit={randomOutput}
              actionNeeded={true}
            />,
          )
        }
      >
        Ideas
      </div>{" "}
    </DesktopWindow>
  );
}
