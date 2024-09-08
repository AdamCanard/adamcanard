"use client";

import Form from "./form";
import List from "./list";

export default function Body() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 w-full h-full">
      <div className="flex flex-row w-full col-span-2 row-span-2 gap-2">
        <List Title="Drank" />
        <List Title="Drink" />
      </div>
      <div className="flex flex-row w-full justify-between col-span-2 row-span-1 gap-2">
        <Form Title="Drank" Fields={["Beer", "Brewery", "Rating"]} />
        <Form Title="Drink" Fields={["Beer", "Brewery", "By"]} />
      </div>
    </div>
  );
}
