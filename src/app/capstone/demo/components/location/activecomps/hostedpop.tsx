"use client";
import { useState } from "react";

export default function HostedPop() {
  const [popCount, setPopCount] = useState<number>(0);

  const adder = () => {
    const newPopCount = popCount + 1;
    setPopCount(newPopCount);
  };
  const subtractor = () => {
    if (popCount != 0) {
      const newPopCount = popCount - 1;
      setPopCount(newPopCount);
    }
  };
  return (
    <div className={"flex flex-row gap-6 border-4 p-4 w-full"}>
      <button className={"text-3xl w-full border-2"} onClick={adder}>
        +
      </button>
      <div className={"select-none text-3xl w-full border-2 text-center"}>
        {popCount}
      </div>
      <button className={"text-3xl w-full border-2"} onClick={subtractor}>
        -
      </button>
    </div>
  );
}
