"use client";

//import Image from "next/image";
import DesktopWindow from "./desktop/sitecomps/desktopwindow";

export default function Test() {
  return (
    <DesktopWindow title="Test" width="20rem" height="32rem">
      <div className={"flex flex-col w-full h-full"}></div>
    </DesktopWindow>
  );
}
