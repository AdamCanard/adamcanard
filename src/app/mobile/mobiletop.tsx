import TabButton from "./tabbutton";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  createContext,
} from "react";
import { BeerData } from "../types";
import MobileList from "./mobilelist";
import InfoCard from "./infocard";

interface MobileContextType {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}

//cast empty object to contexttype
export const MobileContext = createContext<MobileContextType>(
  {} as MobileContextType,
);
export default function MobileTop() {
  const [listElements, setListElements] = useState<BeerData[]>([]);
  const [tab, setTab] = useState<string>("Info");

  const getListElements = async () => {
    try {
      const response = await fetch("/api/getbeer/", { method: "GET" });
      const beerListResponse = await response.json();
      setListElements(beerListResponse.items);
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
    <>
      <MobileContext.Provider value={{ tab, setTab }}>
        <div className={"flex flex-row justify-between"}>
          <div className={"w-full h-8 flex flex-row"}>
            <TabButton title="Info" set={setTab} />
          </div>
          <div className={"w-full h-8 flex flex-row justify-end"}>
            <TabButton title="Drank" set={setTab} />
            <TabButton title="Drink" set={setTab} />
          </div>
        </div>
        <div id="Mwindow" className={"w-full h-full relative flex flex-col"}>
          {tab === "Info" ? (
            <InfoCard />
          ) : (
            <MobileList
              listElements={
                tab === "Drank"
                  ? listElements.filter((element) => element.Drank == true)
                  : listElements.filter((element) => element.Drank == false)
              }
            />
          )}
        </div>
      </MobileContext.Provider>
    </>
  );
}
