"use client";

import { IDrink } from "@/app/capstone/serverfunctions/types";
import CountingInput from "./countinginput";

export default function CountingCategory(props: {
  category: string;
  data: IDrink[];
}) {
  return (
    <div className={"flex flex-col h-full gap-1"}>
      <h2 className={"text-2xl font-bold"}>{props.category}</h2>
      {props.data.map((item: IDrink) => {
        return (
          <CountingInput
            name={item.drinkName}
            id={item.drinkId}
            key={item.drinkId}
          />
        );
      })}
    </div>
  );
}
