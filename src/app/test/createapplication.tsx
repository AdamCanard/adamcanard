import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";
import Minesweeper from "./applications/minesweeper/minesweeperstart";
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
export const createMinesweeper = (key: string) => {
  const newMinesweeper: IWindow = {
    window: <Minesweeper key={key} />,
    title: "Minesweeper",
    width: 16,
    height: 3,
    defaultWidth: 16,
    defaultHeight: 3,
    top: 0,
    left: 0,
    icon: MobileIcon,
    minimized: false,
  };
  return newMinesweeper;
};

export const applicationRecord: Record<string, (key: string) => IWindow> = {
  Mobile: createMobile,
  Minesweeper: createMinesweeper,
};
export const createApplication = (application: string, index: number) => {
  const createApp = applicationRecord[application];
  if (index === 0) {
    return createApp(application);
  }
  return createApp(`${application} (${index})`);
};
