import { IScreen } from "./gamecontainer";
import Grid, { gridActions } from "./grid";
import { Chest, Empty, Wall } from "./rooms";

export const screens: Record<string, IScreen> = {
  grid: {
    window: <Grid />,
    actions: gridActions,
  },
  wall: {
    window: <Wall />,
    actions: {},
  },
  empty: {
    window: <Empty />,
    actions: {},
  },
  chest: {
    window: <Chest />,
    actions: {},
  },
};
