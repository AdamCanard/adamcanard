import { useEffect, useState } from "react";
import DrinkBeer from "./drinkbeer";
import { BeerData } from "../types";
import FinishBeer from "./finishbeer";

export default function CurrentDrink() {
  const [currentBeer, setCurrentBeer] = useState<BeerData[]>([]);

  const getData = async () => {
    try {
      const response = await fetch("/api/activebeer/", { method: "GET" });
      const beerListResponse = await response.json();
      setCurrentBeer(beerListResponse.items);
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
    getData();
  }, []);

  return (
    <>
      {currentBeer.length === 0 ? (
        <>
          <DrinkBeer />
        </>
      ) : (
        <>
          <FinishBeer beer={currentBeer[0]} />
        </>
      )}
    </>
  );
}
