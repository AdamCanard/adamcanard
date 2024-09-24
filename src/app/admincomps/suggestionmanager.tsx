"use client";

import { useContext, useEffect, useState } from "react";
import DraggableWindow from "../semantics/draggablewindow";
import WindowInternal from "../semantics/windowinternal";
import { TaskbarContext } from "../sitecomps/toplevel";
import SuggestionListElement from "./suggestionlistelement";

export default function SuggestionManager() {
  const [listElements, setListElements] = useState([]);

  const taskbarContext = useContext(TaskbarContext);

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
    <div className="w-full">
      <DraggableWindow
        title="Suggestion Manager"
        close={() => taskbarContext.setWindow("")}
        width={"1/3"}
        heigth={"2/3"}
      >
        <WindowInternal>
          <div className="w-full flex flex-col h-72 overflow-y-scroll">
            {listElements.map((data, index) => {
              return <SuggestionListElement data={data} key={index} />;
            })}
          </div>
        </WindowInternal>
      </DraggableWindow>
    </div>
  );
}
