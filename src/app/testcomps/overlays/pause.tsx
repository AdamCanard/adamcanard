import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";
import HomeButton from "../screens/screenscomps/homebutton";

export default function Pause() {
  const [selected, setSelected] = useState(0);
  const { setControls, changeScreen, screenControls, changeOverlay } =
    useContext(ScreenContext);
  const storedControls: IScreenActions = screenControls;
  const buttons = useMemo(() => ["play", "home"], []);

  const up = useCallback(() => {
    if (selected !== 0) {
      const newIndex = selected - 1;
      setSelected(newIndex);
    }
  }, [setSelected, selected]);

  const down = useCallback(() => {
    if (selected !== 1) {
      const newIndex = selected + 1;
      setSelected(newIndex);
    }
  }, [selected, setSelected]);

  const a = useCallback(() => {
    setControls(storedControls);
    changeOverlay("");
    changeScreen(buttons[selected]);
  }, [
    buttons,
    changeScreen,
    selected,
    changeOverlay,
    setControls,
    storedControls,
  ]);

  const gridControls: IScreenActions = useMemo(
    () => ({
      a,
      up,
      down,
    }),
    [up, down, a],
  );

  useEffect(() => {
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <div className={"GridSize flex flex-col justify-around"}>
      <div className={"w-full flex flex-col gap-4  items-center"}>
        {buttons.map((button) => {
          return (
            <HomeButton
              title={button}
              buttons={buttons}
              selected={selected}
              key={button}
            />
          );
        })}
      </div>
    </div>
  );
}
