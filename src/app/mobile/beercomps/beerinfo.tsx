import { useContext, useEffect, useState } from "react";
import { BeerContext } from "../beer";

export default function BeerInfo() {
  const { beerId } = useContext(BeerContext);
  const [beer, setBeer] = useState();
  const getBeer = async () => {
    try {
      const response = await fetch("/api/beer/" + beerId, {
        method: "GET",
      });
      const beerData = await response.json();

      setBeer(beerData);
      return beerData;
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
    getBeer();
  });

  return <>{JSON.stringify(beer)}</>;
}
