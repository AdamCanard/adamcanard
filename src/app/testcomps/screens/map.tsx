import { useContext, useEffect } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";

export default function Map() {
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      b: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeScreen]);
  return (
    <div className={"GridInner"}>
      <div className={"flex flex-col GridSize bg-black"}></div>
    </div>
  );
}
