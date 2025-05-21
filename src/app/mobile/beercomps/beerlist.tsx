import { useContext, useEffect, useState } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function BeerList() {
  const { chooseBeer, back, keyword } = useContext(BeerContext);
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
      {" "}
      {keyword ? (
        <>
          {" "}
          <div id="border" className={"w-full flex h-9 "}>
            <button
              className={"w-6 text-3xl leading-0 hover:cursor-pointer"}
              onClick={back}
            >
              {"<"}
            </button>
            <div className={"w-full text-center"}>{keyword}</div>{" "}
          </div>{" "}
          <div className={"flex flex-col h-fit overflow-y-scroll"}>
            <div className="w-full flex flex-col ">
              {beers.map((beer, index) => {
                const id: string = beer._id || "";
                if (beer.keywords?.includes(keyword))
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
      ) : (
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
      )}
    </>
  );
}
