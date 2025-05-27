import Image from "next/image";
import MadeLogo from "../../../../../public/Mitchell.jpeg";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IScreenActions, ScreenContext } from "../../gamecontainer";

export default function Homepage() {
  const { setControls, changeScreen } = useContext(ScreenContext);
  const buttons = useMemo(() => ["about", "games"], []);
  const [selected, setSelected] = useState(0);
  const left = useCallback(() => {
    if (selected !== 0) {
      const newIndex = selected - 1;
      setSelected(newIndex);
    }
  }, [setSelected, selected]);

  const right = useCallback(() => {
    if (selected !== 1) {
      const newIndex = selected + 1;
      setSelected(newIndex);
    }
  }, [selected, setSelected]);

  const a = useCallback(() => {
    changeScreen(buttons[selected]);
  }, [buttons, changeScreen, selected]);
  const b = useCallback(() => {
    changeScreen("home");
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
  //things to find
  // 1. logo
  // 2. about us page
  //  2a. Adam
  //  2b. Everest
  //  2c. Domonique
  //  2d. Mieke
  //  2e. Sebastien
  // 3. games page
  //  3a. Exhabition
  //  3b. The Agency

  return (
    <div
      className={
        "GridSize bg-white relative flex  flex-col justify-around items-center"
      }
    >
      <Image src={MadeLogo} alt="made games log" width={150} height={150} />
      <div className={"flex flex-row justify-around w-full"}>
        {" "}
        <div
          className={`${selected === 0 ? "HomeButtonSelected" : "HomeButton"} w-20 h-12 flex justify-center items-center`}
        >
          About
        </div>
        <div
          className={`${selected === 1 ? "HomeButtonSelected" : "HomeButton"} w-20 h-12 flex justify-center items-center`}
        >
          Games
        </div>
      </div>
    </div>
  );
}
