"use client";
import { useContext } from "react";
import Desktop from "./sitecomps/desktop";
import { Taskbar } from "./sitecomps/taskbar";
import { TaskbarContext } from "./taskbarcontext";
import Loading from "./sitecomps/loading";

export default function Page() {
  const { username } = useContext(TaskbarContext);
  return (
    <>
      {username != "" ? (
        <div
          unselectable="on"
          className="h-full w-full flex flex-col justify-center items-center"
        >
          <Desktop />
          <Taskbar />
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </>
  );
}
