import { createContext, useEffect, useState } from "react";
import { beerScreens } from "./beercomps/beerscreens";
import { IBeer } from "@/app/server/models/beer";

export interface BeerContextType {
  beers: IBeer[];
  beer: IBeer;
  drinkBeer: () => void;
  chooseBeer: (beer: IBeer) => void;
  mutateBeer: (beer: IBeer) => void;
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
  const [beers, setBeers] = useState<IBeer[]>([]);
  const [filter, setFilter] = useState<Record<string, string | number>>({});
  const [keywords, setKeywords] = useState<string[]>([]);
  const [render, setRender] = useState<JSX.Element>(beerScreens["list"]);

  const mutateBeer = (beer: IBeer) => {
    let update = false;
    const newBeers = [...beers].map((listBeer) => {
      if (listBeer._id === beer._id) {
        update = true;
        return beer;
      } else {
        return listBeer;
      }
    });
    if (!update) {
      newBeers.push(beer);
    }
    console.log(newBeers);
    setBeers(newBeers);
  };

  const drinkBeer = () => {
    setRender(beerScreens["drink"]);
  };

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
  const getListElements = async () => {
    try {
      const response = await fetch("/api/beer/", {
        method: "GET",
      });
      const listResponse = await response.json();

      setBeers(listResponse.toReversed());

      return listResponse;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getListElements();
  }, []);
  return (
    <BeerContext.Provider
      value={{
        beers,
        beer,
        chooseBeer,
        mutateBeer,
        drinkBeer,
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
      <div
        className={
          "bg-[#c6c6c6] flex flex-col w-full h-full relative overflow-y-hidden"
        }
      >
        {render}
      </div>
    </BeerContext.Provider>
  );
}
