"use client";

import List from "./list";
export default function EventsPage() {
  const logId = (elementId: number) => {
    console.log(elementId);
  };
  const completeValuesToDisplay: Record<string, string> = {};
  completeValuesToDisplay["functionNumber"] = "Function";
  completeValuesToDisplay["clientName"] = "Client Name";
  completeValuesToDisplay["locationId"] = "Location";

  const notCompleteValuesToDisplay: Record<string, string> = {};
  notCompleteValuesToDisplay["functionNumber"] = "Function";
  notCompleteValuesToDisplay["clientName"] = "Client Name";
  notCompleteValuesToDisplay["status"] = "Event Status";
  notCompleteValuesToDisplay["locationId"] = "Location";

  return (
    <div className={"w-full h-full bg-background flex flex-col"}>
      <div className={"h-1/2"}>
        {" "}
        <List
          name="Active Events"
          api="events/notcompleted"
          passId={logId}
          valuesToDisplay={notCompleteValuesToDisplay}
        />
      </div>
      <div className={"h-1/2"}>
        {" "}
        <List
          name="Completed Events"
          api="events/completed"
          passId={logId}
          valuesToDisplay={completeValuesToDisplay}
        />
      </div>
    </div>
  );
}
