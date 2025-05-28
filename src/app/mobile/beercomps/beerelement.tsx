import { useContext } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function BeerElement(props: { beer: IBeer }) {
  const { chooseBeer } = useContext(BeerContext);
  return (
    <div
      className="flex w-full h-9 justify-between items-center Beer"
      onClick={() => chooseBeer(props.beer)}
    >
      <div>{props.beer.name}</div>
      <div>{props.beer.brewery}</div>
      <div>{props.beer.rating}</div>
    </div>
  );
}
