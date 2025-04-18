"use client";
import { useRouter } from "next/navigation";

import List from "../components/list";
import DrinkForm from "../components/drinkform";

export default function DrinksPage() {
  const router = useRouter();
  const logId = (elementId: number) => {
    router.push("desktop/drinks/" + elementId);
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
        form={<DrinkForm />}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
