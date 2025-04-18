"use client";
import { useContext } from "react";
import ListElement from "./listelement";
import { ListContext } from "./list";

export default function ListData() {
  const { listValues } = useContext(ListContext);
  return (
    <>
      <div className={"flex flex-col items-center overflow-y-scroll w-full"}>
        <>
          {listValues.map((listValue) => {
            // This is assuming that the first value in the object is the associatedID
            const listElementId = Object.values(listValue)[0];

            return <ListElement dataObject={listValue} key={listElementId} />;
          })}
        </>
      </div>
    </>
  );
}
