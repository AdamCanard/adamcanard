import { useContext, useEffect } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";
import ScreenBar from "./screenscomps/screenbar";

export default function Wall() {
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      a: () => console.log("interact"),
      b: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"flex flex-col GridInner"}>
      <div className={"GridSize bg-gray-500"}>
        <ScreenBar />
      </div>
    </div>
  );
}
