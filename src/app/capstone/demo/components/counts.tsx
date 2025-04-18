"use client";
import List from "../components/list";

export default function CountsPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["userId"] = "User Name";
  valuesToDisplay["time"] = "Time of Count Completion";
  return (
    <div className={"w-full h-full bg-background flex flex-col relative"}>
      <List
        name="Counts"
        api="counts"
        valuesToDisplay={valuesToDisplay}
        passId={logId}
      />
    </div>
  );
}
