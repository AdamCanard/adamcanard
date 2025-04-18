"use client";
import List from "../components/list";

export default function TransfersPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const valuesToDisplay: Record<string, string> = {};
  valuesToDisplay["userId"] = "User Name";
  valuesToDisplay["time"] = "Time of Transfer ";
  valuesToDisplay["fromLocationId"] = "From Location";
  valuesToDisplay["toLocationId"] = "To Location";
  return (
    <div className={"w-full h-full bg-background flex flex-col"}>
      <List
        name="Transfers"
        api="transfers"
        passId={logId}
        valuesToDisplay={valuesToDisplay}
      />
    </div>
  );
}
