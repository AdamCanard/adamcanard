"use client";
import Windows from "../../../../public/Windows/Windows.png";
import Image from "next/image";
import TaskbarTabs from "./taskbartabs";
import { useState } from "react";

export function Taskbar() {
  const [show, setShow] = useState(false);
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        {show && (
          <div className={"absolute w-80 h-96 bottom-8"}>
            <div className={"flex flex-col w-full h-full"}>
              <div id="boxshadow" className={"flex flex-col h-full"}>
                <div className={"relative w-full h-full"}>
                  <Image src={"/AdamBeer1.jpg"} alt="Photo of me" fill={true} />
                </div>
              </div>

              <div id="boxshadow" className={"flex flex-col w-full"}>
                <h1 id="title">Links</h1>
                <div
                  className={
                    "w-full h-full flex flex-row justify-end items-center"
                  }
                >
                  <a href="https://www.instagram.com/adam_cunard/" id="button">
                    Instagram
                  </a>
                  <a
                    href="https://ca.linkedin.com/in/adam-cunard-3a4644287?trk=people-guest_people_search-card"
                    id="button"
                  >
                    LinkedIn
                  </a>
                  <a href="https://github.com/AdamCanard" id="button">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
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
