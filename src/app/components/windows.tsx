import { useContext } from "react";
import DesktopWindow from "./sitecomps/desktopwindow";
import { TaskbarContext } from "./sitecomps/toplevel";

export default function Windows() {
  const { windows } = useContext(TaskbarContext);
  return (
    <DesktopWindow title="Windows" width="48" height="96">
      <div>
        {windows.map((window: JSX.Element, index: number) => {
          return (
            <div id="boxshadow" key={index}>
              {window.key}
            </div>
          );
        })}
      </div>
    </DesktopWindow>
  );
}
