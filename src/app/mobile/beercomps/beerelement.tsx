import { useContext } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function BeerElement(props: { beer: IBeer }) {
  const { chooseBeer } = useContext(BeerContext);
  return (
    <div
      className="flex w-full h-full justify-between items-center Beer"
      onClick={() => chooseBeer(props.beers[index])}
    >
      <div>{props.beer.name}</div>
      <div>{props.beer.brewery}</div>
      <div>{props.beer.rating}</div>
    </div>
  );
}
