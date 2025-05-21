import { createContext, useState } from "react";
import BeerList from "./beercomps/beerlist";
import BeerInfo from "./beercomps/beerinfo";

export interface BeerContextType {
  beerId: string;
  keyword: string;
  chooseBeer: (beerId: string) => void;
  chooseKeyword: (keyword: string) => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);
export default function Beer() {
  const [beerId, setBeerId] = useState("");
  const [keyword, setKeyword] = useState("");
  const chooseBeer = (beerId: string) => {
    setBeerId(beerId);
  };
  const chooseKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  const back = () => {
    if (keyword !== "") {
      setKeyword("");
    } else {
      setBeerId("");
    }
  };
  return (
    <BeerContext.Provider
      value={{ beerId, keyword, chooseBeer, chooseKeyword, back }}
    >
      {" "}
      <div className={"flex flex-col w-full h-full"}>
        {beerId === "" || keyword !== "" ? <BeerList /> : <BeerInfo />}
      </div>
    </BeerContext.Provider>
  );
}
