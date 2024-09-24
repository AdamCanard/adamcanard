"use client";
import { BeerData } from "../types";
import WindowInternal from "../semantics/windowinternal";
import BeerListElement from "../components/beerlistelement";
import DraggableWindow from "../semantics/draggablewindow";

export default function AdminList(props: {
  Title: string;
  listElements: BeerData[];
}) {
  return (
    <DraggableWindow title={props.Title} width={"1/3"} heigth={"72"}>
      <WindowInternal>
        <div className="w-full flex flex-col max-h-72 overflow-y-scroll">
          {/* For each database object in list elements */}
          {props.listElements.map((listElement, index) => {
            return <BeerListElement data={listElement} key={index} />;
          })}
        </div>
      </WindowInternal>
    </DraggableWindow>
  );
}
