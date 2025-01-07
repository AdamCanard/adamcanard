"use client";
import { useContext } from "react";
import DesktopWindow from "./sitecomps/desktopwindow";
import { TaskbarContext } from "./taskbarcontext";
import { Omit } from "./listcomps/omit";

export default function UserPanel() {
  const { user } = useContext(TaskbarContext);
  const keys = Object.keys(user);
  return (
    <DesktopWindow title={user.Name} width={"16rem"} height={""}>
      <>
        {Object.values(user).map((data, index: number) => {
          if (!Omit.includes(keys[index])) {
            return (
              <div
                id="border"
                className="flex w-full h-full justify-between items-center p-3"
                key={user.Name}
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
