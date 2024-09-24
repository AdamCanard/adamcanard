"use client";
import { useEffect, useState } from "react";
import DrankForm from "./drankform";
import DrinkForm from "./drinkform";
import { BeerData } from "../types";

import AdminList from "./adminlist";

export default function AdminBody() {
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
    <div className="w-full h-full">
      <AdminList
        Title="Drank"
        listElements={listElements.filter((element) => element.Drank == true)}
      />
      <AdminList
        Title="Drink"
        listElements={listElements.filter((element) => element.Drank == true)}
      />

      <DrankForm />
      <DrinkForm />
    </div>
  );
}
