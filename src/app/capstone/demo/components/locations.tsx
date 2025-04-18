"use client";
import { useRouter } from "next/navigation";
import List from "../components/list";

export default function LocationsPage() {
  const router = useRouter();
  const logId = (elementId: number) => {
    router.push("desktop/locations/" + elementId);
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
