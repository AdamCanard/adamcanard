import Windows from "../../../../public/Windows/Windows.png";
import Image from "next/image";
import TaskbarTabs from "./taskbartabs";

export function Taskbar() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        <div id="border-nb" className=" z-10 w-16 h-16 ">
          <Image src={Windows} width={64} height={64} alt="Windows logo" />
        </div>

        <div id="border-b" className="z-0 w-full h-8 flex ">
          <TaskbarTabs />
        </div>
      </div>
    </div>
  );
}
