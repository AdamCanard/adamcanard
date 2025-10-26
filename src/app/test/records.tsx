import { ReactElement } from "react";
import MobilePage from "../mobile/mobilepage";
import Image, { StaticImageData } from "next/image";

import MobileIcon from "../../../public/Windows/MobileIcon.png";
export interface IWindow {
  window: ReactElement;
  title: string;
  width: number;
  height: number;
  minimized: boolean;
  icon: StaticImageData;
}

export const TestRecord: Record<string, IWindow> = {
  Mobile: {
    window: <MobilePage key={"Mobile"} />,
    title: "Mobile",
    width: 24,
    height: 48,
    icon: MobileIcon,
    minimized: false,
  },
};

export const StartMenuRecord: Record<string, IWindow> = {
  PlaceHolderSettings: {
    window: (
      <Image src={MobileIcon} alt={" Icon"} fill={true} key={"Settings"} />
    ),
    title: "placeholder",
    width: 16,
    height: 16,
    icon: MobileIcon,
    minimized: false,
  },
};
