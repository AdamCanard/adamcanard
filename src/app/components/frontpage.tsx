import { SetStateAction, useEffect, useState } from "react";
import Body from "./body";
import Window from "./window";
import BeerPanel from "./beerpanel";
import { BeerData } from "../types";
import { createContext } from "react";

interface IdContextType {
  setId: React.Dispatch<SetStateAction<string>>;
}

//cast empty object to contexttype
export const IdContext = createContext<IdContextType>({} as IdContextType);

export default function Frontpage() {
  const [id, setId] = useState<string>("");
  const [beerFlag, setBeerFlag] = useState<boolean>(false);
  const [beer, setBeer] = useState<BeerData>({} as BeerData);

  useEffect(() => {
    if (id != "") {
      getData();
    }
  }, [id]);

  const getData = async () => {
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
  };

  return (
    <>
      <IdContext.Provider value={{ setId }}>
        {beerFlag ? (
          <div className="w-full h-full flex flex-row justify-around">
            <div>
              <Window title="ADAM DRINKS BEER">
                <Body />
              </Window>
            </div>
            <div className="w-1/3">
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
        ) : (
          <div>
            <Window title="ADAM DRINKS BEER">
              <Body />
            </Window>
          </div>
        )}
      </IdContext.Provider>
    </>
  );
}
