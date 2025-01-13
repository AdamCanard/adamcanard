"use client";

import DesktopWindow from "./desktop/sitecomps/desktopwindow";

export default function Test() {
  return (
    <DesktopWindow title="Test" width="24rem" height="16rem">
      <div id="boxshadow" className={"w-full h-full"}></div>
    </DesktopWindow>
  );
}
