import Grid from "./grid";
import Chest from "./screens/chest";
import Credits from "./screens/credits";
import { Empty } from "./screens/empty";
import FullSite from "./screens/fullsite";
import Home from "./screens/home";
import Wall from "./screens/wall";

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
