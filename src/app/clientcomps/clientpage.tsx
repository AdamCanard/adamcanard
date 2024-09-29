"use client";
import { useContext } from "react";
import { TaskbarContext } from "../sitecomps/toplevel";

export default function ClientPage() {
  const { windows } = useContext(TaskbarContext);
  return (
    <>
      <div className="flex flex-row w-full h-full justify-center">
        {windows.map((tab) => {
          return <div key={tab.key}>{tab}</div>;
        })}
      </div>
    </>
  );
}
