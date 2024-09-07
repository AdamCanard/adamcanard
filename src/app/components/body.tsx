"use client";

import Form from "./form";
import List from "./list";

export default function Body() {
  return (
    <div
      id="border"
      className="flex flex-col md:flex w-full h-full gap-2 items-center"
    >
      <div className="flex flex-row flex-wrap ">
        <List Title="Drank" />
        <List Title="Drink" />
      </div>
      <div className="flex flex-row gap-32 ">
        <Form Title="Drank" Fields={["Beer", "Brewery", "Rating"]} />
        <Form Title="Drink" Fields={["Beer", "Brewery", "By"]} />
      </div>
    </div>
  );
}
