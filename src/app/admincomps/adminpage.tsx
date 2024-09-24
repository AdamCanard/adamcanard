import { useCallback, useContext, useEffect, useState } from "react";
import { BeerData } from "../types";
import BeerPanel from "../beerviewcomps/beerpanel";
import SuggestionManager from "./suggestionmanager";
import { TaskbarContext } from "../sitecomps/toplevel";
import AdminBody from "./adminbody";

export default function AdminPage() {
  return <MainMenu />;
}

export function MainMenu() {
  const { ids } = useContext(TaskbarContext);
  const [beers, setBeers] = useState<BeerData[]>([]);

  const getData = useCallback(
    async (id: string) => {
      const formData = new FormData();
      formData.append("id", id);
      try {
        const response = await fetch("/api/getbeerbyid/", {
          method: "POST",
          body: formData,
        });
        const beerData = await response.json();
        const prevBeers = beers;
        console.log(prevBeers, beerData);
        setBeers([...prevBeers, beerData]);
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
    },
    [beers]
  );

  useEffect(() => {
    if (ids.length != 0) {
      getData(ids[ids.length - 1]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids]);

  return (
    <>
      <div className="flex flex-row w-full h-full justify-center">
        <AdminBody />
        <BeerScreen beers={beers} />
        {/* <SuggestionManager /> */}
      </div>
    </>
  );
}

export function BeerScreen(props: { beers: BeerData[] }) {
  return props.beers.map((beer, index) => {
    return <BeerPanel beer={beer} key={index + beer.Beer} />;
  });
}
