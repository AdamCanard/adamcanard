import { useContext, useEffect, useState } from "react";
import BeerList from "./beerlist";
import Filter from "./filter";
import FilteredList from "./filteredlist";
import { IBeer } from "@/app/server/models/beer";
import { BeerContext } from "../beer";

export default function BeerProvider() {
  const { filter, keywords } = useContext(BeerContext);
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
      {Object.keys(filter).length + keywords.length !== 0 ? (
        <>
          <Filter />
          <FilteredList beers={beers} />
        </>
      ) : (
        <BeerList beers={beers} />
      )}
    </>
  );
}
