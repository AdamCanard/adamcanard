"use client";
import { BeerData } from "../types";

export default function MobileListElement(props: { data: BeerData }) {
  return (
    <>
      <div
        id="border"
        className="flex w-full h-full justify-between items-center p-2 "
      >
        <>
          <div>{props.data.Beer}</div>
          <div>{props.data.Brewery}</div>
          {props.data.Rating != 0 ? (
            <div>{props.data.Rating}</div>
          ) : (
            <div>{props.data.By}</div>
          )}
        </>
      </div>
    </>
  );
}
