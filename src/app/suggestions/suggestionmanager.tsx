"use client";
import { useRouter } from "next/navigation";
import Window from "../semantics/window";
import { useEffect, useState } from "react";
import { ISuggestion } from "../types";

export default function SuggestionManager() {
  const router = useRouter();
  const [listElements, setListElements] = useState([]);
  const getListElements = async () => {
    try {
      const response = await fetch("/api/getsuggestions/", { method: "GET" });
      const suggestionsListResponse = await response.json();

      setListElements(suggestionsListResponse.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
      } else {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getListElements();
  }, []);

  return (
    <div className="w-1/3">
      <Window title="Suggestion Manager" close={() => router.push("/")}>
        <div className="w-full flex flex-col h-72 overflow-y-scroll">
          {listElements.map((data, index) => {
            return <SuggestionListElement data={data} key={index} />;
          })}
        </div>
      </Window>
    </div>
  );
}

export function SuggestionListElement(props: { data: ISuggestion }) {
  const Accept = async () => {};
  const Deny = async () => {};
  return (
    <div className="flex flex-row pr-1">
      <div
        id="border"
        className="flex w-full h-8 justify-between items-center p-2 gap-2 "
      >
        <>
          <div>{props.data.Beer}</div>
          <div>{props.data.Brewery}</div>
          <div>{props.data.Name}</div>
        </>
      </div>
      <div className="flex flex-row w-20 h-8 gap-1">
        <div id="accept" onClick={Accept}></div>
        <div id="deny" onClick={Deny}></div>
      </div>
    </div>
  );
}
