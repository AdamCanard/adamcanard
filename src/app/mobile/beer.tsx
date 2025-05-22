import { createContext, useState } from "react";
import BeerList from "./beercomps/beerlist";
import BeerInfo from "./beercomps/beerinfo";
import { IBeer } from "../server/models/beer";

export interface BeerContextType {
  beer: IBeer;
  search: Record<string, string | number>;
  chooseBeer: (beer: IBeer) => void;
  addSearch: (key: string, value: string | number) => void;
  removeSearch: (key: string) => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);

export default function Beer() {
  const [beer, setBeer] = useState({} as IBeer);
  const [search, setSearch] = useState<Record<string, string | number>>({});
  const chooseBeer = (beer: IBeer) => {
    setBeer(beer);
  };
  const addSearch = (key: string, value: string | number) => {
    const newSearch = { ...search };
    newSearch[key] = value;
    setSearch(newSearch);
  };
  const removeSearch = (key: string) => {
    const newSearch = { ...search };
    delete newSearch[key];
    setSearch(newSearch);
  };

  const back = () => {
    setBeer({} as IBeer);
  };
  return (
    <BeerContext.Provider
      value={{ beer, search, chooseBeer, addSearch, removeSearch, back }}
    >
      {" "}
      <div className={"flex flex-col w-full h-full"}>
        {Object.keys(beer).length === 0 ? <BeerList /> : <BeerInfo />}
      </div>
    </BeerContext.Provider>
  );
}
