import { useContext } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";
import BeerElement from "./beerelement";

export default function BeerList(props: { beers: IBeer[] }) {
  const { filter, keywords } = useContext(BeerContext);
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
          {Object.keys(filter).length + keywords.length !== 0 ? (
            <>
              {props.beers.map((beer) => {
                const id: string = beer._id || "";
                return <BeerElement beer={beer} key={id} />;
              })}
            </>
          ) : (
            <>
              {props.beers.map((beer) => {
                const id: string = beer._id || "";

                if (inSearch(beer)) return <BeerElement beer={beer} key={id} />;
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
