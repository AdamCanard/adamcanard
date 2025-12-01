import { IScreenActions, ScreenContext } from "@/app/gamecomps/gamecontainer";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";

export default function Games() {
  const { setControls, changeScreen } = useContext(ScreenContext);
  const buttons = useMemo(() => [], []);

  const [selected, setSelected] = useState(0);
  const left = useCallback(() => {
    if (selected !== 0) {
      const newIndex = selected - 1;
      setSelected(newIndex);
    }
  }, [setSelected, selected]);

  const right = useCallback(() => {
    if (selected !== 2) {
      const newIndex = selected + 1;
      setSelected(newIndex);
    }
  }, [selected, setSelected]);

  const a = useCallback(() => {
    changeScreen(buttons[selected]);
  }, [buttons, changeScreen, selected]);
  const b = useCallback(() => {
    changeScreen("skip");
  }, [changeScreen]);

  const gridControls: IScreenActions = useMemo(
    () => ({
      a,
      b,
      left,
      right,
    }),
    [left, right, a, b],
  );

  useEffect(() => {
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return <div className={"GridSize bg-white "}></div>;
}
