import Grid from "../grid";
import Map from "../overlays/map";
import Chest from "./chest";
import Credits from "./credits";
import { Empty } from "./empty";
import About from "./fullsite/about/about";
import Games from "./fullsite/games/games";
import Homepage from "./fullsite/homepage";
import Home from "./home";
import Opening from "./opening";
import Wall from "./wall";

export const screens: Record<string, JSX.Element> = {
  home: <Home />,
  play: <Opening />,
  back: <Grid />,
  skip: <Homepage />,
  about: <About />,
  games: <Games />,
  credits: <Credits />,
  grid: <Grid />,
  wall: <Wall />,
  empty: <Empty />,
  chest: <Chest />,
  map: <Map />,
};
