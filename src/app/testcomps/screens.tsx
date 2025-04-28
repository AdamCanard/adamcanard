import Grid from "./grid";
import { Chest, Empty, Wall } from "./rooms";

export const screens: Record<string, JSX.Element> = {
  grid: <Grid />,
  wall: <Wall />,
  empty: <Empty />,
  chest: <Chest />,
};
