import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IScreenActions, ScreenContext } from "@/app/gamecomps/gamecontainer";
import Adam from "./adam";
import Dominique from "./dominique";
import Everest from "./everest";
import Mieke from "./mieke";
import Sebastian from "./sebastian";

export default function About() {
  const { setControls, changeScreen } = useContext(ScreenContext);
  const about = useMemo(
    () => [
      <Adam key={"Adam"} />,
      <Dominique key={"Dominique"} />,
      <Everest key={"Everest"} />,
      <Mieke key={"Mieke"} />,
      <Sebastian key={"Sebastian"} />,
    ],
    [],
  );

  const [selected, setSelected] = useState(0);
  const left = useCallback(() => {
    if (selected !== 0) {
      const newIndex = selected - 1;
      setSelected(newIndex);
    }
  }, [setSelected, selected]);

  const right = useCallback(() => {
    if (selected !== about.length - 1) {
      const newIndex = selected + 1;
      setSelected(newIndex);
    }
  }, [selected, setSelected, about.length]);

  const b = useCallback(() => {
    changeScreen("skip");
  }, [changeScreen]);

  const gridControls: IScreenActions = useMemo(
    () => ({
      b,
      left,
      right,
    }),
    [left, right, b],
  );

  useEffect(() => {
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return <div className={"GridSize bg-white "}>{about[selected]}</div>;
}
