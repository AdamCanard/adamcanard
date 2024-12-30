import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import Image, { StaticImageData } from "next/image";

export default function Application(props: {
  title: string;
  src: StaticImageData;
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

  return (
    <div onClick={openAppWindow} className={"w-full h-full "}>
      <Image
        className={"hover:cursor-pointer"}
        src={props.src}
        alt={props.title + " desktop image"}
      />
    </div>
  );
}
