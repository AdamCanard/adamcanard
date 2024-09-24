"use client";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import Body from "../admincomps/adminbody";
import Window from "../semantics/window";
import BeerPanel from "./beerpanel";
import { BeerData } from "../types";
import { createContext } from "react";

interface IdContextType {
  setId: React.Dispatch<SetStateAction<string>>;
  setBeerFlag: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const IdContext = createContext<IdContextType>({} as IdContextType);

export function BeerSheet() {
  const [id, setId] = useState<string>("");
  const [beerFlag, setBeerFlag] = useState<boolean>(false);
  const [beer, setBeer] = useState<BeerData>({} as BeerData);

  const getData = useCallback(async () => {
    const formData = new FormData();
    formData.append("id", id);
    try {
      const response = await fetch("/api/getbeerbyid/", {
        method: "POST",
        body: formData,
      });

      const beerData = await response.json();
      setBeer(beerData);
      setBeerFlag(true);
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
  }, [id]);

  useEffect(() => {
    if (id != "") {
      getData();
    }
  }, [getData, id]);

  return (
    <>
      <IdContext.Provider value={{ setId, setBeerFlag }}>
        {!beerFlag ? (
          <Window title="ADAM DRINKS BEER">
            <Body />
          </Window>
        ) : (
          <div className=" h-full flex flex-row justify-around">
            <div className="w-2/3">
              <Window title="ADAM DRINKS BEER">
                <Body />
              </Window>
            </div>

            <div className="flex w-1/3 h-full items-center justify-center">
              <div>
                <Window
                  title="Beer Viewer"
                  close={() => {
                    setBeerFlag(false);
                    setId("");
                  }}
                >
                  <BeerPanel beer={beer} />
                </Window>
              </div>
            </div>
          </div>
        )}
      </IdContext.Provider>
    </>
  );
}
