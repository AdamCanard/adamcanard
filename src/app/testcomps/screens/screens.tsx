import Grid from "../grid";
import Map from "../overlays/map";
import Chest from "./chest";
import Credits from "./credits";
import { Empty } from "./empty";
import FullSite from "./fullsite";
import Home from "./home";
import Wall from "./wall";

export const screens: Record<string, JSX.Element> = {
  home: <Home />,
  play: <Grid />,
  skip: <FullSite />,
  credits: <Credits />,
  grid: <Grid />,
  wall: <Wall />,
  empty: <Empty />,
  chest: <Chest />,
  map: <Map />,
};
