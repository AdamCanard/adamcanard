import { createContext, useState } from "react";
import BeerList from "./beercomps/beerlist";
import BeerInfo from "./beercomps/beerinfo";

export interface BeerContextType {
  beerId: string;
  chooseBeer: (beerId: string) => void;
  back: () => void;
}
export const BeerContext = createContext<BeerContextType>(
  {} as BeerContextType,
);
export default function Beer() {
  const [beerId, setBeerId] = useState("");
  const chooseBeer = (beerId: string) => {
    setBeerId(beerId);
  };
  const back = () => {
    setBeerId("");
  };
  return (
    <BeerContext.Provider value={{ beerId, chooseBeer, back }}>
      {" "}
      <div className={"flex flex-col w-full h-full"}>
        {beerId === "" ? <BeerList /> : <BeerInfo />}
      </div>
    </BeerContext.Provider>
  );
}
