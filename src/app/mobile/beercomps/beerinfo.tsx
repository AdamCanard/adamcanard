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
      <LabeledBeerData label={"Name"} data={beer.name} />
      <LabeledBeerData label={"Brewery"} data={beer.brewery} />
      <LabeledBeerData label={"Time"} data={beer.time} />
      <LabeledBeerData label={"Rating"} data={beer.rating} />
      <BeerKeyword keywords={beer.keywords || []} />
    </div>
  );
}
function LabeledBeerData(props: { label: string; data: string | number }) {
  return (
    <div id={"border"} className={"w-full flex justify-between"}>
      <label>{props.label}:</label>
      <div>{props.data}</div>
    </div>
  );
}
function BeerKeyword(props: { keywords: string[] }) {
  const { chooseKeyword } = useContext(BeerContext);
  return (
    <div id="border" className={"flex gap-2 flex-wrap"}>
      {" "}
      {props.keywords.map((keyword) => {
        return (
          <div
            className={"Keyword"}
            key={keyword}
            onClick={() => chooseKeyword(keyword)}
          >
            {keyword}
          </div>
        );
      })}
    </div>
  );
}
