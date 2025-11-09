import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";

export enum applicationEnum {
  "Mobile" = "Mobile",
}

export const createApplication = (
  application: applicationEnum,
  index: number,
) => {
  switch (application) {
    case applicationEnum.Mobile:
      if (index === 0) {
        return createMobile("Mobile");
      }
      return createMobile(`Mobile (${index})`);
  }
};

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
