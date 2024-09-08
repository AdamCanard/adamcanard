"use client";

import Form from "./form";
import List from "./list";

export default function Body() {
  return (
    <div className="grid grid-cols-2 grid-rows-3 w-full h-full gap-x-2">
      <div className="col-span-1 row-span-2">
        <List Title="Drank" />
      </div>
      <div className="col-span-1 row-span-2">
        <List Title="Drink" />
      </div>
      <div className="row-span-1 col-span-1">
        <Form Title="Drank" Fields={["Beer", "Brewery", "Rating"]} />
      </div>
      <div className="row-span-1 col-span-1">
        <Form Title="Drink" Fields={["Beer", "Brewery", "By"]} />
      </div>
    </div>
  );
}
