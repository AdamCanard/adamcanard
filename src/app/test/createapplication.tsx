import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";

export enum applicationEnum {
  "Mobile" = "Mobile",
}

export const createNewApplication = (application: applicationEnum) => {
  switch (application) {
    case applicationEnum.Mobile:
      return createMobile("Mobile");
  }
};

export const createAnotherApplication = (
  application: applicationEnum,
  index: number,
) => {
  switch (application) {
    case applicationEnum.Mobile:
      return createMobile(`Mobile (${index})`);
  }
};

export const createMobile = (key: string) => {
  const newMobile: IWindow = {
    window: <MobilePage key={key} />,
    title: "Mobile",
    width: 24,
    height: 48,
    icon: MobileIcon,
    minimized: false,
  };
  return newMobile;
};
