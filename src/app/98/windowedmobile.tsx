import MobilePage from "@/app/mobile/mobilepage";
import DesktopWindow from "./sitecomps/desktopwindow";

export default function WindowedMobile() {
  return (
    <DesktopWindow title="Mobile" width="24rem" height="46rem">
      <MobilePage />
    </DesktopWindow>
  );
}
