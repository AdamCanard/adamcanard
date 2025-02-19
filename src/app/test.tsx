"use client";

import DesktopWindow from "./desktop/sitecomps/desktopwindow";
import GameContainer from "./testcomps/gamecontainer";

export default function Test() {
  return (
    <DesktopWindow title="Test" width="" height="">
      <GameContainer />
    </DesktopWindow>
  );
}
