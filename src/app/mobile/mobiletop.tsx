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
import TabBar from "./tabbar";
import Suggest from "./suggest";
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

  const TabDecider = (tab: string) => {
    switch (tab) {
      case "Info":
        return <InfoCard />;
      case "Drank":
        return (
          <MobileList
            listElements={listElements.filter(
              (element) => element.Drank == true,
            )}
          />
        );

      case "Drink":
        return (
          <MobileList
            listElements={listElements.filter(
              (element) => element.Drank == false,
            )}
          />
        );
      case "Suggest":
        return <Suggest />;
      default:
    }
  };

  useEffect(() => {
    getListElements();
  }, []);

  return (
    <>
      <MobileContext.Provider value={{ tab, setTab }}>
        <TabBar />
        {TabDecider(tab)}
      </MobileContext.Provider>
    </>
  );
}
