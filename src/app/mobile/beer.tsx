import { createContext, useState } from "react";
import BeerInfo from "./beercomps/beerinfo";
import { IBeer } from "../server/models/beer";
import BeerProvider from "./beercomps/beerprovider";

export interface BeerContextType {
  beer: IBeer;
  chooseBeer: (beer: IBeer) => void;
  filter: Record<string, string | number>;
  addFilter: (key: string, value: string | number) => void;
  removeFilter: (key: string) => void;
  keywords: string[];
  addKeyword: (value: string) => void;
  removeKeyword: (value: string) => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);

export default function Beer() {
  const [beer, setBeer] = useState({} as IBeer);
  const [filter, setFilter] = useState<Record<string, string | number>>({});
  const [keywords, setKeywords] = useState<string[]>([]);
  const chooseBeer = (beer: IBeer) => {
    setBeer(beer);
  };
  const addFilter = (key: string, value: string | number) => {
    const newFilter = { ...filter };
    newFilter[key] = value;
    setFilter(newFilter);
  };
  const removeFilter = (key: string) => {
    const newFilter = { ...filter };
    delete newFilter[key];
    setFilter(newFilter);
  };
  const addKeyword = (value: string) => {
    const newKeywords = [...keywords];
    if (!newKeywords.includes(value)) {
      newKeywords.push(value);
    }
    setKeywords(newKeywords);
  };

  const removeKeyword = (value: string) => {
    const newKeywords = [...keywords];
    if (newKeywords.includes(value)) {
      newKeywords.splice(newKeywords.indexOf(value), 1);
    }
    setKeywords(newKeywords);
  };
  const back = () => {
    setBeer({} as IBeer);
  };

  return (
    <BeerContext.Provider
      value={{
        beer,
        chooseBeer,
        filter,
        addFilter,
        removeFilter,
        keywords,
        addKeyword,
        removeKeyword,
        back,
      }}
    >
      {" "}
      <div className={"flex flex-col w-full h-full"}>
        {Object.keys(beer).length === 0 ? <BeerProvider /> : <BeerInfo />}
      </div>
    </BeerContext.Provider>
  );
}
