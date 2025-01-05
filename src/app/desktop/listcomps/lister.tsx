import { useContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import List from "./list";
import { TaskbarContext } from "../taskbarcontext";

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
  const isOpen = (name: string) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == name) {
        return true;
      }
    }
    return false;
  };

  //const randomOutput = (data: never[]) => {
  //  alert(Object.values(data[Math.floor(Math.random() * data.length)])[0]);
  //};
  return (
    <DesktopWindow title="Lists" width={"8rem"} height={""}>
      {lists.map((collection: string) => {
        return (
          <div
            id={
              isOpen(collection) ? "button-taskbar-pressed" : "button-taskbar"
            }
            key={collection}
            onClick={() =>
              handleClick(
                <List
                  title={collection}
                  key={collection}
                  adminNeeded={true}
                  submit={() => {}}
                  actionNeeded={false}
                />,
              )
            }
          >
            {collection}
          </div>
        );
      })}
    </DesktopWindow>
  );
}

const lists = ["Beers", "Suggestion", "Ideas"];
