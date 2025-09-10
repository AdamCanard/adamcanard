import { ReactElement } from "react";
import MobilePage from "../mobile/mobilepage";
export interface IWindow {
  window: ReactElement;
  width: number;
  height: number;
}
export const windowRecord: Record<string, IWindow> = {
  Mobile: { window: <MobilePage key={"Mobile"} />, width: 32, height: 32 },
};
