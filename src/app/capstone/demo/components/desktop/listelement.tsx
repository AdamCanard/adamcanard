"use client";
import { useContext } from "react";
import { ListContext } from "./list";
import { LookupContext } from "@/app/capstone/contexts/lookupcontext";

export default function ListElement(props: { dataObject: object }) {
  const { passId, valuesToDisplay } = useContext(ListContext);
  const { locationLookup, userLookup } = useContext(LookupContext);
  const values = Object.values(props.dataObject);
  const keys = Object.keys(props.dataObject);
  const elementId = values[0];

  return (
    <button
      name={"Element-" + elementId}
      className={
        "flex flex-row gap-2 border-b-2 justify-around w-full py-1 odd:bg-gray-200 hover:bg-gray-300"
      }
      onClick={() => passId(+elementId)}
    >
      {keys.map((elementKey: string, index: number) => {
        if (index !== 0) {
          if (valuesToDisplay[elementKey] !== undefined) {
            if (
              elementKey === "locationId" ||
              elementKey === "fromLocationId" ||
              elementKey === "toLocationId"
            ) {
              const locationId = values[index];
              values[index] = locationLookup[locationId as keyof object];
            }

            if (elementKey === "userId" || elementKey === "currentUserId") {
              const userId = values[index];
              values[index] = userLookup[userId as keyof object];
            }
            if (elementKey === "time") {
              const time = values[index];
              values[index] =
                new Date(time).getFullYear() +
                  "-" +
                  new Date(time).getMonth() +
                  "-" +
                  new Date(time).getDate() +
                  " | " +
                  new Date(time).getHours() +
                  ":" +
                  new Date(time).getMinutes() +
                  ":" +
                  new Date(time).getSeconds() || "";
            }

            return (
              <div
                className={"flex flex-row w-full justify-center"}
                key={elementKey}
              >
                <div>
                  {typeof values[index] === "boolean" ? (
                    <>{values[index] ? <>{"true"}</> : <>{"false"}</>}</>
                  ) : (
                    <>{values[index]}</>
                  )}
                </div>
              </div>
            );
          }
        }
      })}
    </button>
  );
}
