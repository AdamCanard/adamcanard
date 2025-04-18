"use client";
import { useRouter } from "next/navigation";
import List from "../components/list";

export default function TransfersPage() {
  const router = useRouter();
  const logId = (elementId: number) => {
    router.push("desktop/transfers/" + elementId);
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
