import Map from "./map";
import Pause from "./pause";

export const overlays: Record<string, JSX.Element> = {
  map: <Map />,
  pause: <Pause />,
  "": <></>,
};
