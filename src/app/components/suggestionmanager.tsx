"use client";

import { useContext, useEffect, useState } from "react";
import DraggableWindow from "./semanticcomps/draggablewindow";
import WindowInternal from "./semanticcomps/windowinternal";
import { TaskbarContext } from "./sitecomps/toplevel";
import SuggestionListElement from "./suggestionlistelement";

export default function SuggestionManager() {
  const [listElements, setListElements] = useState([]);

  const { windows, setWindows } = useContext(TaskbarContext);

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

  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "SuggestionManager") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  return (
    <div className="w-full">
      <DraggableWindow
        title="Suggestion Manager"
        width={"1/3"}
        heigth={"2/3"}
        windowKey="SuggestionManager"
        close={() => handleClose()}
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
