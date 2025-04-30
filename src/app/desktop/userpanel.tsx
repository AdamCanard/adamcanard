"use client";
import { useContext } from "react";
import DesktopWindow from "./sitecomps/desktopwindow";
import { TaskbarContext } from "./taskbarcontext";

export default function UserPanel() {
  const { user } = useContext(TaskbarContext);
  const keys = Object.keys(user);
  return (
    <DesktopWindow title={user.username} width={"16rem"} height={""}>
      <>
        {Object.values(user).map((data, index: number) => {
          if (!["_id", "__v", "lists"].includes(keys[index])) {
            return (
              <div
                id="border"
                className="flex w-full h-full justify-between items-center p-3"
                key={index}
              >
                <div>{keys[index]}:</div>
                <div>{data as string}</div>
              </div>
            );
          }
        })}
      </>
    </DesktopWindow>
  );
}
