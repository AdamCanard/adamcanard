import { useRouter } from "next/navigation";
import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import Mob from "../../../public/Windows/Mob.png";
import Image from "next/image";

export function Taskbar() {
  const router = useRouter();
  const taskbarContext = useContext(TaskbarContext);

  const RouteSuggestion = async () => {
    router.push("admin/suggestions");
  };
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        <div id="border-nb" className=" z-10 w-16 h-16 ">
          <Image src={Mob} width={64} height={64} alt="Mob charater" />
        </div>
        <div id="border-b" className=" z-0 w-full h-8 ">
          <div className="flex h-full justify-end items-center gap-2">
            {!taskbarContext.admin && (
              <div onClick={RouteSuggestion}>Suggestion Manager</div>
            )}
            <div id="username-content">
              <div>apple</div>
            </div>
            <div id="username">{taskbarContext.username}</div>
            <div
              id="button-nm"
              className="leading-8 hover:cursor-pointer"
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
