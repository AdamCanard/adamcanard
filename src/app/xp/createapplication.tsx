import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";
import Minesweeper from "./applications/minesweeper/minesweeper";
import WindowManager from "./applications/windowmanager/windowmanager";
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
export const createWindowManager = (key: string) => {
  const newWindowManager: IWindow = {
    window: <WindowManager key={key} />,
    title: "WindowManager",
    width: 20,
    height: 6,
    defaultWidth: 20,
    defaultHeight: 4,
    top: 0,
    left: 0,
    icon: MobileIcon,
    minimized: false,
  };
  return newWindowManager;
};

export const applicationRecord: Record<string, (key: string) => IWindow> = {
  Mobile: createMobile,
  Minesweeper: createMinesweeper,
  WindowManager: createWindowManager,
};
export const createApplication = (application: string, index: number) => {
  const createApp = applicationRecord[application];
  if (index === 0) {
    return createApp(application);
  }
  return createApp(`${application} (${index})`);
};
