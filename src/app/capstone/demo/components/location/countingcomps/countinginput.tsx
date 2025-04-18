"use client";
import { useState } from "react";

export default function CountingInput(props: { name: string; id: number }) {
  const [value, setValue] = useState<number>(0);
  const handleSetValue = (e: React.ChangeEvent<HTMLElement>) => {
    const newValue = +(e.target as HTMLInputElement).value;
    setValue(newValue < 0 ? 0 : newValue);
  };
  return (
    <div
      className={
        "flex justify-between items-center odd:bg-gray-300 even:bg-gray-200 pl-2 p-1 rounded-md"
      }
    >
      <label className={"text-xl text-start"}>{props.name}</label>
      <input
        type="number"
        className={"border-2 border-text p-2 w-[5rem] rounded-md"}
        name={props.name + ":" + props.id}
        value={value}
        onChange={(e) => {
          handleSetValue(e);
        }}
      />
    </div>
  );
}
