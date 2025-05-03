import Grid from "./grid";
import { Chest, Empty, Wall } from "./rooms";
import Home from "./screens/home";

export const screens: Record<string, JSX.Element> = {
  home: <Home />,
  grid: <Grid />,
  wall: <Wall />,
  empty: <Empty />,
  chest: <Chest />,
};
