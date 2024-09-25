import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import Mob from "../../../public/Windows/Mob.png";
import Image from "next/image";
import TaskbarTabs from "./taskbartabs";

export function Taskbar() {
  const taskbarContext = useContext(TaskbarContext);

  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        <div id="border-nb" className=" z-10 w-16 h-16 ">
          <Image src={Mob} width={64} height={64} alt="Mob charater" />
        </div>

        <div id="border-b" className=" z-0 w-full h-8 flex justify-between">
          <div className="flex h-full items-center justify-start">
            <TaskbarTabs />
          </div>
          <div className="flex h-full justify-end items-center ">
            {taskbarContext.admin && <div id="button-taskbar">Suggestions</div>}

            <div id="button-taskbar">{taskbarContext.username}</div>
            <div
              id="button-taskbar"
              onClick={() => taskbarContext.adminCheck()}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
