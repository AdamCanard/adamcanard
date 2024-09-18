"use client";
import { BeerData } from "../types";
import { useContext } from "react";
import { IdContext } from "./beersheet";

export default function ListElement(props: { data: BeerData }) {
  const idContext = useContext(IdContext);
  console.log(idContext);
  //On click pass the beers database id to the router

  const handleClick = () => {
    console.log(props.data.id);
    if (props.data.id) {
      idContext.setId(props.data.id);
    }
  };
  return (
    <>
      <div
        id="border"
        className="flex w-full h-full justify-between items-center p-2 "
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
