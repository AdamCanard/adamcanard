"use client";
import { BeerData } from "../types";
import BeerListElement from "./beerlistelement";

export default function BeerList(props: { listElements: BeerData[] }) {
  return (
    <>
      <div className="w-full flex flex-col max-h-60 overflow-y-scroll">
        {/* For each database object in list elements */}
        {props.listElements.map((listElement, index) => {
          return <BeerListElement data={listElement} key={index} />;
        })}
      </div>
    </>
  );
}
