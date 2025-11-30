"use client";
import Windows from "../../../../public/Windows/Windows.png";
import Image from "next/image";
import TaskbarTabs from "./taskbartabs";
import { useState } from "react";
import WindowsPopUp from "./windowspopup";

export function Taskbar() {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        {show && <WindowsPopUp />}
        <div
          id={show ? "border-nb-pressed" : "border-nb"}
          className=" z-10 w-16 h-16 "
          onClick={() => {
            setShow(!show);
          }}
        >
          <Image src={Windows} width={64} height={64} alt="Windows logo" />{" "}
        </div>
        <div id="border-b" className="z-0 w-full h-8 flex ">
          <TaskbarTabs />
        </div>
      </div>
    </div>
  );
}
