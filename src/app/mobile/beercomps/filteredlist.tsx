import { useContext } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function FilteredList(props: { beers: IBeer[] }) {
  const { chooseBeer, filter, keywords } = useContext(BeerContext);
  const inSearch = (beer: IBeer) => {
    //const time = search["time"];
    const brewery = filter["brewery"];
    const rating = filter["rating"];
    if (
      beer.brewery === brewery ||
      keywords.every((child) => beer.keywords?.includes(child)) ||
      beer.rating === rating
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <div className={"flex flex-col h-fit overflow-y-scroll"}>
        <div className="w-full flex flex-col ">
          {props.beers.map((beer, index) => {
            const id: string = beer._id || "";
            if (inSearch(beer))
              return (
                <div
                  key={index + id}
                  className="flex w-full h-full justify-between items-center Beer"
                  onClick={() => chooseBeer(props.beers[index])}
                >
                  <div>{beer.name}</div>
                  <div>{beer.brewery}</div>
                  <div>{beer.rating}</div>
                </div>
              );
          })}
        </div>
      </div>
    </>
  );
}
