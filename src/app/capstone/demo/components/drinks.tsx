"use client";

import List from "../components/list";

export default function DrinksPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["drinkName"] = "Name";
  valuesToDisplay["cost"] = "Cost";
  valuesToDisplay["category"] = "Category";
  return (
    <div className={"w-full h-full bg-background flex flex-col"}>
      <List
        name="Drinks"
        api="Drinks"
        passId={logId}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
