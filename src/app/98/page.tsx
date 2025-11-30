import Desktop from "./sitecomps/desktop";
import { Taskbar } from "./sitecomps/taskbar";

export default function Page() {
  return (
    <div
      unselectable="on"
      className="h-full w-full flex flex-col justify-center items-center"
    >
      <Desktop />
      <Taskbar />
    </div>
  );
}
