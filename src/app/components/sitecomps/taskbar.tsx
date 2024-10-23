import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import Windows from "../../../../public/Windows/Windows.png";
import Image from "next/image";
import TaskbarTabs from "./taskbartabs";
import SuggestionManager from "../suggestionmanager";
import AdminPanel from "../adminpanel";

export function Taskbar() {
  const { windows, setWindows, admin, username } = useContext(TaskbarContext);

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

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        <div id="border-nb" className=" z-10 w-16 h-16 ">
          <Image src={Windows} width={64} height={64} alt="Windows logo" />
        </div>

        <div id="border-b" className=" z-0 w-full h-8 flex justify-between">
          <div className="flex h-full items-center justify-start">
            <TaskbarTabs />
          </div>
          <div className="flex h-full justify-end items-center ">
            {admin && (
              <div
                id="button-taskbar"
                onClick={() => {
                  handleClick(<SuggestionManager key={"SuggestionManager"} />);
                }}
              >
                Suggestions
              </div>
            )}

            <div id="button-taskbar">{username}</div>
            <div
              id="button-taskbar"
              onClick={() => {
                handleClick(<AdminPanel key={"AdminPanel"} />);
              }}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
