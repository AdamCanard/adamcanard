import { useCallback, useContext, useEffect, useState } from "react";
import { BeerContext } from "../beer";
import { IBeer } from "@/app/server/models/beer";

export default function BeerInfo() {
  const { beerId, back } = useContext(BeerContext);
  const [beer, setBeer] = useState({} as IBeer);
  const getBeer = useCallback(async () => {
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
  }, [beerId]);

  useEffect(() => {
    getBeer();
  }, [getBeer]);

  return (
    <div className={"w-full h-full flex flex-col"}>
      <div id="border" className={"w-full flex justify-between h-9 "}>
        <button
          className={"w-6 text-3xl leading-0 hover:cursor-pointer"}
          onClick={back}
        >
          {"<"}
        </button>
        <div>Beer Info:</div>
        <button className={"w-6 text-3xl leading-0"}>{"+"}</button>
      </div>
      <div id={"border"} className={"w-full flex justify-between"}>
        {" "}
        <label>Name:</label>
        <div>{beer.name}</div>
      </div>{" "}
      <div id={"border"} className={"w-full flex justify-between"}>
        {" "}
        <label>Brewery:</label>
        <div>{beer.brewery}</div>
      </div>
      <div id={"border"} className={"w-full flex justify-between"}>
        {" "}
        <label>Time:</label>
        <div>{beer.time}</div>
      </div>
      <div id={"border"} className={"w-full flex justify-between"}>
        {" "}
        <label>Rating:</label>
        <div>{beer.rating}</div>
      </div>
    </div>
  );
}
