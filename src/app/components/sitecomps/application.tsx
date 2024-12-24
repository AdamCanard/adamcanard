import { useContext } from "react";
import { TaskbarContext } from "./toplevel";

export default function Application(props: {
  title: string;
  src: string;
  window: JSX.Element;
}) {
  const { windows, setWindows } = useContext(TaskbarContext);
  const openAppWindow = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == props.window.key) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
        return;
      }
    }
    setWindows([...windows, props.window]);
  };

  return <div onClick={openAppWindow}></div>;
}
