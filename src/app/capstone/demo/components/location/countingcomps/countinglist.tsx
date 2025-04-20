"use client";

import { getLocationDrinks } from "@/app/capstone/serverfunctions/drinklocations";
import { IDrink } from "@/app/capstone/serverfunctions/types";
import { useCallback, useEffect, useState } from "react";
import CountingCategory from "./countingcategory";
export default function CountingList(props: { locationId: string }) {
  const [items, setItems] = useState<Record<string, IDrink[]>>(
    {} as Record<string, IDrink[]>,
  );

  const getDrinks = useCallback(async () => {
    const drinkData: Record<string, IDrink[]> | Error = await getLocationDrinks(
      props.locationId,
      "letmein",
    );

    if (drinkData instanceof Error) {
    } else {
      setItems(drinkData);
    }
  }, [props.locationId]);

  useEffect(() => {
    getDrinks();
  }, [getDrinks]);

  return (
    <div
      className={
        "w-full h-full flex flex-col justify-start border-2 p-2 border-text overflow-y-scroll rounded-md gap-10"
      }
    >
      {Object.keys(items).map((category: string, index: number) => {
        if (Object.values(items)[index].length > 0) {
          return (
            <CountingCategory
              category={category}
              data={Object.values(items)[index]}
              key={category}
            />
          );
        }
      })}{" "}
    </div>
  );
}
