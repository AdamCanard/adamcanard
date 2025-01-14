"use client";

import Image from "next/image";
import DesktopWindow from "./desktop/sitecomps/desktopwindow";

export default function Test() {
  return (
    <DesktopWindow title="Test" width="20rem" height="32rem">
      <div className={"flex flex-col w-full h-full"}>
        <div id="boxshadow" className={"flex flex-col h-full"}>
          <div className={"relative w-full h-full"}>
            <Image src={"/AdamBeer1.jpg"} alt="Photo of me" fill={true} />
          </div>
        </div>

        <div id="boxshadow" className={"flex flex-col w-full"}>
          <h1 id="title">Links</h1>
          <div
            className={"w-full h-full flex flex-row justify-end items-center"}
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
    </DesktopWindow>
  );
}
