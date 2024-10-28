"use client";
import { TaskbarContext } from "./sitecomps/toplevel";
import { BeerData } from "../types";
import { useContext } from "react";

export default function BeerListElement(props: { data: BeerData }) {
  const { beers, setBeers } = useContext(TaskbarContext);

  const getData = async () => {
    if (props.data.id) {
      const formData = new FormData();
      formData.append("id", props.data.id);
      try {
        const response = await fetch("/api/getbeerbyid/", {
          method: "POST",
          body: formData,
        });
        const beerData = await response.json();
        for (let i = 0; i < beers.length; i++) {
          if (beerData.Beer == beers[i].Beer) {
            return;
          }
        }
        const prevBeers = beers;
        setBeers([...prevBeers, beerData]);
      } catch (err: unknown) {
        if (err instanceof Error) {
          return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            { status: 500, headers: {} },
          );
        } else {
          console.log(err);
        }
      }
    }
  };

  const handleClick = () => {
    if (props.data.id) {
      getData();
    }
  };
  return (
    <>
      <div
        id="border"
        className="flex w-full h-full justify-between items-center p-2 hover:cursor-pointer"
        onClick={handleClick}
      >
        <>
          <div>{props.data.Beer}</div>
          <div>{props.data.Brewery}</div>
          {props.data.Rating != 0 ? (
            <div>{props.data.Rating}</div>
          ) : (
            <div>{props.data.By}</div>
          )}
        </>
      </div>
    </>
  );
}
