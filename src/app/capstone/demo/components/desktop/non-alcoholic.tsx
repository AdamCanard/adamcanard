"use client";
import List from "./list";

export default function NonAlcoholicPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["locationName"] = "Location Name";

  return (
    <div className={"w-full h-full bg-background flex flex-col relative"}>
      <List
        name="Non-Alcoholic"
        api="locations"
        passId={logId}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
