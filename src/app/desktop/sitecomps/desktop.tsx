import DesktopApplications from "./desktopapplications";
import WindowManager from "./windowmanager";

export default function Desktop() {
  return (
    <>
      <div className="flex flex-row w-full h-full justify-center">
        <DesktopApplications />
        <WindowManager />
      </div>
    </>
  );
}
