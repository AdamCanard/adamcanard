"use client";
import { BeerData } from "../types";
import BeerListElement from "./beerlistelement";

import Window from "../semantics/window";
import WindowInternal from "../semantics/windowinternal";

export default function List(props: {
  Title: string;
  listElements: BeerData[];
}) {
  return (
    <Window title={props.Title}>
      <WindowInternal>
        <div className="w-full flex flex-col h-72 overflow-y-scroll">
          {/* For each database object in list elements */}
          {props.listElements.map((listElement, index) => {
            return <BeerListElement data={listElement} key={index} />;
          })}
        </div>
      </WindowInternal>
    </Window>
  );
}
