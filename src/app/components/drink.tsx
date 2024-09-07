"use client";
import { useEffect, useContext } from "react";
import { BeerContext } from "./beerdisplay";
import { PopupContext } from "./beerviewer";

export function Drink() {
  const beerData = useContext(BeerContext);
  const popupData = useContext(PopupContext);

  //call for changing drank value of database object
  const drinkBeer = async (formData: FormData) => {
    try {
      const response = await fetch("/api/drinkbeer/", {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    } catch (err: any) {
      return new Response(
        JSON.stringify({ error: err.message || err.toString() }),
        {
          status: 500,
          headers: {},
        }
      );
    }
  };

  //On click enable popup if rating or brewery are empty
  const handleClick = async () => {
    if (beerData.Rating == 0 || beerData.Brewery == "") {
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
      formData.append("id", beerData.id);
      formData.append("Beer", beerData.Beer);
      formData.append("Brewery", popupData.brewery);
      formData.append("By", beerData.By);
      formData.append("Rating", popupData.rating);
      formData.append("Drank", true);
      drinkBeer(formData);
    }
  }, [popupData, beerData]);

  return (
    <div
      onClick={handleClick}
      className="flex w-12 h-12 border-2 border-black bg-white hover:cursor-pointer"
    >
      Drink Me!
    </div>
  );
}
