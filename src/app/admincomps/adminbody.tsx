"use client";

import DrankForm from "./drankform";
import DrinkForm from "./drinkform";

import AdminList from "./adminlist";

export default function AdminBody() {
  return (
    <div className="w-full h-full">
      {/* <AdminList
        Title="Drank"
        listElements={listElements.filter((element) => element.Drank == true)}
      />
      <AdminList
        Title="Drink"
        listElements={listElements.filter((element) => element.Drank == false)}
      /> */}
      <DrankForm />
      <DrinkForm />
    </div>
  );
}
