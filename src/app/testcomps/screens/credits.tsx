import { useCallback, useContext, useEffect, useMemo } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";

export default function Credits() {
  const { setControls, changeScreen } = useContext(ScreenContext);
  const credits = [
    "Adam Cunard",
    "Everest Wild",
    "Dominique Berger",
    "Mieke LastName",
    "Sebastien Wild",
  ];
  const b = useCallback(() => {
    changeScreen("home");
  }, [changeScreen]);

  const gridControls: IScreenActions = useMemo(
    () => ({
      b,
    }),
    [b],
  );

  useEffect(() => {
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"GridSize flex flex-col justify-around"}>
      <div className={"w-full text-3xl text-center"}>Made Games</div>
      <div className={"w-full flex flex-col gap-4 items-center"}>
        {credits.map((person) => {
          return (
            <div className={"HomeButton w-2/3"} key={person}>
              {person}
            </div>
          );
        })}
      </div>
    </div>
  );
}
