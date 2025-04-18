"use client";
import List from "./list";

export default function LocationsPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["locationName"] = "Location Name";
  return (
    <div className={"w-full h-full bg-background flex flex-col"}>
      <List
        name="Locations"
        api="locations"
        passId={logId}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
