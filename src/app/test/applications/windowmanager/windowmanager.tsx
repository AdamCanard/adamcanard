import { useContext } from "react";
import { WindowContext } from "../../windowprovider";

export default function WindowManager() {
  const { activeWindows, closeWindow } = useContext(WindowContext);
  return (
    <div id="border">
      {Object.entries(activeWindows).map(([key]) => {
        return (
          <div
            id="border"
            key={key + " Manager"}
            className={"flex flex-row justify-between"}
          >
            <div>{key}</div>
            <button id="button" onClick={() => closeWindow(key)}>
              close
            </button>
          </div>
        );
      })}
    </div>
  );
}
