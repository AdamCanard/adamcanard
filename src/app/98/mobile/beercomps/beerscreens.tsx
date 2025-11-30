import BeerAdder from "./beeradder";
import BeerDrink from "./beerdrink";
import BeerInfo from "./beerinfo";
import BeerProvider from "./beerprovider";

export const beerScreens: Record<string, JSX.Element> = {
  list: <BeerProvider />,
  info: <BeerInfo />,
  add: <BeerAdder />,
  drink: <BeerDrink />,
};
