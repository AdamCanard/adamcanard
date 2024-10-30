import { BeerData } from "@/app/types";
import BeerPanel from "../beerviewcomps/beerpanel";
import { TaskbarContext } from "./toplevel";
import { useContext, useEffect } from "react";
import WindowManager from "./windowmanager";

export default function Desktop() {
  const { windows, setWindows, beers } = useContext(TaskbarContext);

  //Function checks if beer is already rendered in a window
  const BeerRendered = (windows: JSX.Element[], beer: BeerData) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == beer.Beer) {
        return true;
      }
    }
    return false;
  };
  //everytime beers changes
  useEffect(() => {
    for (let i = 0; i < beers.length; i++) {
      if (!BeerRendered(windows, beers[i])) {
        setWindows([
          ...windows,
          <BeerPanel beer={beers[i]} key={beers[i].Beer} />,
        ]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beers]);
  return (
    <>
      <div className="flex flex-row w-full h-full justify-center">
        <WindowManager />
      </div>
    </>
  );
}
