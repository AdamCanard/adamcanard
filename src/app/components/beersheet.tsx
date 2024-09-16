"use client";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import Body from "./body";
import Window from "../semantics/window";
import BeerPanel from "./beerpanel";
import { BeerData } from "../types";
import { createContext } from "react";

interface IdContextType {
  setId: React.Dispatch<SetStateAction<string>>;
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
      })
        .then((res) => {
          console.log(res);
          return res.json();
        })
        .catch((err) => {
          console.error(err);
        });

      setBeer(response);
      setBeerFlag(true);
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  useEffect(() => {
    if (id != "") {
      getData();
    }
  }, [getData, id]);

  return (
    <>
      <IdContext.Provider value={{ setId }}>
        <div className="w-full h-full flex flex-row justify-around">
          <div className="w-2/3">
            <Window title="ADAM DRINKS BEER">
              <Body />
            </Window>
          </div>
          {beerFlag && (
            <div className="w-1/3 h-full">
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
          )}
        </div>
      </IdContext.Provider>
    </>
  );
}
