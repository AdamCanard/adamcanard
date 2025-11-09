import MobilePage from "../mobile/mobilepage";
import { IWindow } from "./records";

import MobileIcon from "../../../public/Windows/MobileIcon.png";
import MinesweeperStart from "./applications/minesweeper/minesweeperstart";
import MinesweeperGame from "./applications/minesweeper/minesweepergame";
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
export const createMinesweeperStart = (key: string) => {
  const newMinesweeper: IWindow = {
    window: <MinesweeperStart key={key} />,
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

export const createMinesweeperEasy = (key: string) => {
  const newMinesweeper: IWindow = {
    window: <MinesweeperGame rows={9} cols={9} bombs={10} key={key} />,
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
export const createMinesweeperMedium = (key: string) => {
  const newMinesweeper: IWindow = {
    window: <MinesweeperGame rows={16} cols={16} bombs={40} key={key} />,
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
export const createMinesweeperHard = (key: string) => {
  const newMinesweeper: IWindow = {
    window: <MinesweeperGame rows={16} cols={30} bombs={99} key={key} />,
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
  Minesweeper: createMinesweeperStart,
  "Minesweeper Easy": createMinesweeperEasy,
  "Minesweeper Medium": createMinesweeperMedium,
  "Minesweeper Hard": createMinesweeperHard,
};
export const createApplication = (application: string, index: number) => {
  const createApp = applicationRecord[application];
  if (index === 0) {
    return createApp(application);
  }
  return createApp(`${application} (${index})`);
};
