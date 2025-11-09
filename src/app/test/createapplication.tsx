import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";
export const createMobile = (key: string) => {
  const newMobile: IWindow = {
    window: <MobilePage key={key} />,
    title: "Mobile",
    width: 24,
    height: 48,
    defaultWidth: 24,
    defaultHeight: 48,
    top: 0,
    left: 0,
    icon: MobileIcon,
    minimized: false,
  };
  return newMobile;
};
export const applicationRecord: Record<string, (key: string) => IWindow> = {
  Mobile: createMobile,
};
export const createApplication = (application: string, index: number) => {
  const createApp = applicationRecord[application];
  if (index === 0) {
    return createApp("Mobile");
  }
  return createMobile(`Mobile (${index})`);
};
