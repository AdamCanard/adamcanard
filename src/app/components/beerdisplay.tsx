import { createContext } from "react";
import { BeerData } from "../types";
import BeerViewer from "./beerviewer";

export const BeerContext = createContext<BeerData>({} as BeerData);

export default function BeerDisplay(params: { beerData: BeerData }) {
  return (
    //setup beerdata context
    <BeerContext.Provider value={params.beerData}>
      <BeerViewer />
    </BeerContext.Provider>
  );
}
