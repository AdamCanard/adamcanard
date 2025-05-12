import { useContext, useEffect } from "react";
import { IScreenActions, ScreenContext } from "../gamecontainer";

export default function Opening() {
  const { changeScreen, setControls } = useContext(ScreenContext);
  useEffect(() => {
    const gridControls: IScreenActions = {
      a: () => changeScreen("grid"),
    };
    setControls(gridControls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={"GridSize"}>
      <div
        className={
          " relative h-full bg-black text-yellow-500 overflow-hidden text-2xl text-justify flex justify-center"
        }
      >
        <div className={"absolute animate-crawl w-[90%] "}>
          {`Long ago, MADE Games had a flourishing website. Filled to the brim with contact information, blurbs from games we've made, and sneak peaks of what's to come... but what was long ago. Since the .com bubble popped, our website has been scattered across a metroidvania, grid based puzzle game. In efforts to return our website to its previous glory, all five members of our team have been trapped inside the game. Waiting for a couragous hero to come save them and their website. Are you up to the challenge?`}
        </div>
      </div>
    </div>
  );
}
