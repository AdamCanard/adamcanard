import Grid from "./grid";
import { Chest, Empty, Wall } from "./rooms";
import Credits from "./screens/credits";
import FullSite from "./screens/fullsite";
import Home from "./screens/home";

export const screens: Record<string, JSX.Element> = {
  home: <Home />,
  play: <Grid />,
  skip: <FullSite />,
  credits: <Credits />,
  grid: <Grid />,
  wall: <Wall />,
  empty: <Empty />,
  chest: <Chest />,
};
