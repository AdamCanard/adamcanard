"use client";
import { BeerData } from "../types";
import ListElement from "./listelement";

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
            //if List title is Drank, add database elements whos drank value is true
            if (props.Title == "Drank" && listElement.Drank)
              return <ListElement data={listElement} key={index} />;
            //if List title is Drink, add database elements whos drank value is false
            else if (props.Title == "Drink" && !listElement.Drank) {
              return <ListElement data={listElement} key={index} />;
            }
          })}
        </div>
      </WindowInternal>
      {/* <WindowButton>
        <div
          id="button"
          onClick={refreshData}
          className="hover:cursor-pointer text-center"
        >
          Refresh!
        </div>
      </WindowButton> */}
    </Window>
  );
}
