import { createContext, useState } from "react";
import BeerList from "./beercomps/beerlist";
import BeerInfo from "./beercomps/beerinfo";
import { IBeer } from "../server/models/beer";

export interface BeerContextType {
  beer: IBeer;
  search: Record<string, string | number | string[]>;
  chooseBeer: (beer: IBeer) => void;
  addSearch: (key: string, value: string | number | string[]) => void;
  removeSearch: (key: string) => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);

export default function Beer() {
  const [beer, setBeer] = useState({} as IBeer);
  const [search, setSearch] = useState<
    Record<string, string | number | string[]>
  >({});
  const chooseBeer = (beer: IBeer) => {
    setBeer(beer);
  };
  const addSearch = (key: string, value: string | number | string[]) => {
    const newSearch = { ...search };
    if (key === "keyword") {
      const keywords = (newSearch[key] as string[]) || [];

      keywords.push(value as string);
      newSearch[key] = keywords;
    } else {
      newSearch[key] = value;
    }
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
