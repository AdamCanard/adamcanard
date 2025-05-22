import { useContext, useEffect, useState } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function BeerList() {
  const { chooseBeer, search, removeSearch } = useContext(BeerContext);
  const [beers, setBeers] = useState<IBeer[]>([]);

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
    <>
      {Object.keys(search).length !== 0 && (
        <div id="border" className={"h-10 flex items-center overflow-x-scroll"}>
          <div>Filter: </div>
          {Object.values(search).map((searchTerm, index) => {
            return (
              <div key={index} className={"flex"}>
                <div
                  className={"Keyword"}
                  onClick={() => removeSearch(Object.keys(search)[index])}
                >
                  {searchTerm}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className={"flex flex-col h-fit overflow-y-scroll"}>
        <div className="w-full flex flex-col ">
          {beers.map((beer, index) => {
            const id: string = beer._id || "";
            return (
              <div
                key={index + id}
                className="flex w-full h-full justify-between items-center Beer"
                onClick={() => chooseBeer(beers[index])}
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
