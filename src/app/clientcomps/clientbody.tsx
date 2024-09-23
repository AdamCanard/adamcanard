import { useEffect, useState } from "react";
import BeerLists from "../components/beerlists";
import Suggestion from "./suggestion";
import { BeerData } from "../types";

export default function ClientBody() {
  const [listElements, setListElements] = useState<BeerData[]>([]);
  const getListElements = async () => {
    try {
      const response = await fetch("/api/getbeer/", { method: "GET" });
      const beerListResponse = await response.json();
      setListElements(beerListResponse.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
      } else {
        console.log(err);
      }
    }
  };

  //On Render pull data from database
  useEffect(() => {
    getListElements();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-3 w-full h-full gap-x-2">
      <BeerLists listData={listElements} />

      <div className="row-span-1 col-span-2 ">
        <Suggestion />
      </div>
    </div>
  );
}
