import { useContext } from "react";
import DesktopWindow from "./sitecomps/desktopwindow";
import { TaskbarContext } from "./sitecomps/toplevel";
import { BeerData } from "../types";

export default function Windows() {
  const { windows } = useContext(TaskbarContext);
  return (
    <DesktopWindow title="Windows" width="18rem" height="">
      <div>
        {windows.map((window: JSX.Element, index: number) => {
          return (
            <div id="boxshadow" key={index}>
              {window.key}
            </div>
          );
        })}
      </div>
    </DesktopWindow>
  );
}

export function Beers() {
  const { beers } = useContext(TaskbarContext);

  return (
    <DesktopWindow title="Beers" width="18rem" height="">
      <div>
        {beers.map((beer: BeerData, index: number) => {
          return (
            <div id="boxshadow" key={index}>
              {beer.Beer}
            </div>
          );
        })}
      </div>
    </DesktopWindow>
  );
}
