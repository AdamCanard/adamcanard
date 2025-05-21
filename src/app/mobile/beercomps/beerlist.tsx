import { useContext, useEffect, useState } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function BeerList() {
  const { chooseBeer } = useContext(BeerContext);
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
    <div className={"flex flex-col h-fit overflow-y-scroll"}>
      <div className="w-full flex flex-col ">
        {beers.map((beer, index) => {
          const id: string = beer._id || "";
          return (
            <div
              key={index + id}
              className="flex w-full h-full justify-between items-center Beer"
              onClick={() => chooseBeer(id)}
            >
              <>
                {Object.values(beer).map((data, index: number) => {
                  if ((data as string) !== "" && index !== 0) {
                    return <div key={id + index}>{data as string}</div>;
                  }
                })}
              </>
            </div>
          );
        })}
      </div>
    </div>
  );
}
