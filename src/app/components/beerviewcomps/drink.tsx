"use client";
import { useEffect, useContext } from "react";

import { BeerData } from "../../types";
import { PopupContext } from "./beerpanel";

export function Drink(props: { beer: BeerData }) {
  const popupData = useContext(PopupContext);

  //call for changing drank value of database object
  const drinkBeer = async (formData: FormData) => {
    try {
      const response = await fetch("/api/drinkbeer/", {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
      }
    }
  };

  //On click enable popup if rating or brewery are empty
  const handleClick = async () => {
    if (props.beer.Rating == 0 || props.beer.Brewery == "") {
      popupData.setDrinkTrigger(true);
    }
  };

  //useEffect on drink trigger
  useEffect(() => {
    if (
      //if popup is closed
      !popupData.drinkTrigger &&
      //and rating + brewery are non empty
      popupData.rating != 0 &&
      popupData.brewery != ""
    ) {
      //create formdata and post
      const formData = new FormData();
      formData.append("id", props.beer.id);
      formData.append("Beer", props.beer.Beer);
      formData.append("Brewery", popupData.brewery);
      formData.append("By", props.beer.By);
      formData.append("Rating", popupData.rating);
      formData.append("Drank", true);
      drinkBeer(formData);
    }
  }, [popupData, props.beer]);

  return (
    <div id="border" onClick={handleClick}>
      Drink Me!
    </div>
  );
}
