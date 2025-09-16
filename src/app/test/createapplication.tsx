import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";
export const createMobile = (addKey: string) => {
  const newMobile: IWindow = {
    window: <MobilePage key={"Mobile" + addKey} />,
    width: 24,
    height: 48,
    icon: MobileIcon,
  };
  return newMobile;
};
