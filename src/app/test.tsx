"use client";

import DesktopWindow from "./98/sitecomps/desktopwindow";
import GameContainer from "./gamecomps/gamecontainer";

export default function Test() {
  return (
    <DesktopWindow title="Test" width="16rem" height="">
      <GameContainer />
    </DesktopWindow>
  );
}
