"use client";
import { TaskbarContext } from "../sitecomps/toplevel";
import { BeerData } from "../types";
import { useContext } from "react";

export default function BeerListElement(props: { data: BeerData }) {
  const { setIds, ids } = useContext(TaskbarContext);
  //On click pass the beers database id to the router

  const handleClick = () => {
    if (props.data.id) {
      setIds([...ids, props.data.id]);
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
