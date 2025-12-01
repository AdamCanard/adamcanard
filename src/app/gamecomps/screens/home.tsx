import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";
import HomeButton from "./screenscomps/homebutton";

export default function Home() {
  const [selected, setSelected] = useState(0);
  const { setControls, changeScreen } = useContext(ScreenContext);
  const buttons = useMemo(() => ["play", "skip", "credits"], []);

  const up = useCallback(() => {
    if (selected !== 0) {
      const newIndex = selected - 1;
      setSelected(newIndex);
    }
  }, [setSelected, selected]);

  const down = useCallback(() => {
    if (selected !== 2) {
      const newIndex = selected + 1;
      setSelected(newIndex);
    }
  }, [selected, setSelected]);

  const a = useCallback(() => {
    changeScreen(buttons[selected]);
  }, [buttons, changeScreen, selected]);

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
      <div className={"w-full text-3xl text-center"}>Made Games</div>
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
