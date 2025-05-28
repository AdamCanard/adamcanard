import { createContext, useState } from "react";
import { IBeer } from "../server/models/beer";
import { beerScreens } from "./beercomps/beerscreens";

export interface BeerContextType {
  beer: IBeer;
  chooseBeer: (beer: IBeer) => void;
  filter: Record<string, string | number>;
  addFilter: (key: string, value: string | number) => void;
  removeFilter: (key: string) => void;
  keywords: string[];
  addKeyword: (value: string) => void;
  removeKeyword: (value: string) => void;
  addBeer: () => void;
  clear: () => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);

export default function Beer() {
  const [beer, setBeer] = useState({} as IBeer);
  const [filter, setFilter] = useState<Record<string, string | number>>({});
  const [keywords, setKeywords] = useState<string[]>([]);
  const [render, setRender] = useState<JSX.Element>(beerScreens["list"]);
  const chooseBeer = (beer: IBeer) => {
    setBeer(beer);
    setRender(beerScreens["info"]);
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
  const addBeer = () => {
    setRender(beerScreens["add"]);
  };
  const back = () => {
    setBeer({} as IBeer);
    setRender(beerScreens["list"]);
  };
  const clear = () => {
    setFilter({});
    setKeywords([]);
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
        addBeer,
        clear,
        back,
      }}
    >
      <div className={"flex flex-col w-full h-full relative overflow-y-hidden"}>
        {render}
      </div>
    </BeerContext.Provider>
  );
}
