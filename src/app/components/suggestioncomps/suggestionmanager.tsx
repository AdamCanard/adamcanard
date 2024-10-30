"use client";

import { useEffect, useState } from "react";
import SuggestionListElement from "./suggestionlistelement";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function SuggestionManager() {
  const [listElements, setListElements] = useState([]);

  const getListElements = async () => {
    try {
      const response = await fetch("/api/getsuggestions/", { method: "GET" });
      const suggestionsListResponse = await response.json();
      console.log(suggestionsListResponse.items);
      setListElements(suggestionsListResponse.items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
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
    <div className="w-full">
      <DesktopWindow title="Suggestion Manager" width={"24rem"} height={""}>
        <div className="w-full flex flex-col overflow-y-scroll">
          {listElements.map((data, index) => {
            return <SuggestionListElement data={data} key={index} />;
          })}
        </div>
      </DesktopWindow>
    </div>
  );
}
