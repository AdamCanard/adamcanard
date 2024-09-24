// import Body from "./body";
// import Window from "../semantics/window";
// import { BeerSheet } from "../beerviewcomps/beersheet";

import { useCallback, useContext, useEffect, useState } from "react";
import Window from "../semantics/window";
import { BeerData } from "../types";

import BeerPanel from "../beerviewcomps/beerpanel";
import SuggestionManager from "./suggestionmanager";
import { TaskbarContext } from "../sitecomps/toplevel";
import AdminBody from "./adminbody";

export default function AdminPage() {
  return (
    <MainMenu />
    // <SuggestionManager />
    // <BeerSheet />
    // <Window title="ADAM DRINKS BEER">
    //   <Body />
    // </Window>
  );
}

export function MainMenu() {
  const taskbarContext = useContext(TaskbarContext);
  const [beer, setBeer] = useState<BeerData>({} as BeerData);

  const getData = useCallback(async () => {
    const formData = new FormData();
    formData.append("id", taskbarContext.id);
    try {
      const response = await fetch("/api/getbeerbyid/", {
        method: "POST",
        body: formData,
      });

      const beerData = await response.json();
      setBeer(beerData);
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
  }, [taskbarContext]);

  useEffect(() => {
    if (taskbarContext.id != "") {
      getData();
    }
  }, [getData, taskbarContext.id]);

  return (
    <>
      <div className="flex flex-row w-full h-full justify-center">
        <AdminBody />

        {taskbarContext.window && (
          <>
            {taskbarContext.window === "beer" && (
              <div className="flex w-1/3 h-full items-center justify-center">
                <div>
                  <Window
                    title="Beer Viewer"
                    close={() => {
                      taskbarContext.setWindow("");
                      taskbarContext.setId("");
                    }}
                  >
                    <BeerPanel beer={beer} />
                  </Window>
                </div>
              </div>
            )}
            {taskbarContext.window === "suggestion" && (
              <div className="flex w-1/3 h-full items-center justify-center">
                <SuggestionManager />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
