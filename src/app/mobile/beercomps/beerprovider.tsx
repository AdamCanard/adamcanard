import { useEffect, useState } from "react";
import BeerList from "./beerlist";
import { IBeer } from "@/app/server/models/beer";
import NewBeer from "./newbeer";

export default function BeerProvider() {
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
      <BeerList beers={beers} />
      <NewBeer />
    </>
  );
}
