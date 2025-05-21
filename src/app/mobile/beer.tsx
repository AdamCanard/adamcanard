import { createContext, useState } from "react";
import BeerList from "./beercomps/beerlist";
import BeerInfo from "./beercomps/beerinfo";
import { IBeer } from "../server/models/beer";

export interface BeerContextType {
  beer: IBeer;
  keyword: string;
  chooseBeer: (beer: IBeer) => void;
  chooseKeyword: (keyword: string) => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);
export default function Beer() {
  const [beer, setBeer] = useState({} as IBeer);
  const [keyword, setKeyword] = useState("");
  const chooseBeer = (beer: IBeer) => {
    setBeer(beer);
  };
  const chooseKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const back = () => {
    if (keyword !== "") {
      setKeyword("");
    } else {
      setBeer({} as IBeer);
    }
  };
  return (
    <BeerContext.Provider
      value={{ beer, keyword, chooseBeer, chooseKeyword, back }}
    >
      {" "}
      <div className={"flex flex-col w-full h-full"}>
        {Object.keys(beer).length === 0 || keyword !== "" ? (
          <BeerList />
        ) : (
          <BeerInfo />
        )}
      </div>
    </BeerContext.Provider>
  );
}
