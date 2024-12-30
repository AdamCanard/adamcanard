import { useContext } from "react";
import { TaskbarContext } from "./layout";
import Desktop from "./sitecomps/desktop";
import { Taskbar } from "./sitecomps/taskbar";

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
        <div className={"flex mt-[25%] h-[38px]"}>
          <Loading />
        </div>
      )}
    </>
  );
}
export function Loading() {
  return (
    <div id="boxshadow" className={"w-1/8 h-full"}>
      <h1 id="title">Logging you in...</h1>
    </div>
  );
}
