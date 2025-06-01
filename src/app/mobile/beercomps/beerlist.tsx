import { useContext, useEffect, useState } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";
import BeerElement from "./beerelement";
import Filter from "./filter";

export default function BeerList() {
  const [empty, setEmpty] = useState(false);
  const { filter, keywords, beers } = useContext(BeerContext);
  const inSearch = (beer: IBeer) => {
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
  useEffect(() => {
    console.log("one");
    const interval = setInterval(() => {
      console.log("two");
      setEmpty(true);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={"flex flex-col h-full overflow-y-auto"}>
      <div className="w-full flex flex-col h-full">
        {beers.length === 0 ? (
          <div className={" flex justify-center items-center w-full h-full"}>
            {empty ? (
              <div className={"Border"}>No Beers Found</div>
            ) : (
              <div className={"Border"}>Loading Beers...</div>
            )}
          </div>
        ) : (
          <>
            {Object.keys(filter).length + keywords.length === 0 ? (
              <>
                {beers.map((beer) => {
                  const id: string = beer._id || "";
                  return <BeerElement beer={beer} key={id} />;
                })}
              </>
            ) : (
              <>
                <Filter />
                {beers.map((beer) => {
                  const id: string = beer._id || "";
                  console.log("here");
                  if (inSearch(beer))
                    return <BeerElement beer={beer} key={id} />;
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
