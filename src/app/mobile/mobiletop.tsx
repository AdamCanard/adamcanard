import { Dispatch, SetStateAction, useState, createContext } from "react";
import MobileList from "./mobilelist";
import InfoCard from "./infocard";
import TabBar from "./tabbar";
import Secret from "./secret";
import SuggestionMobile from "../components/suggestioncomps/suggestionmobile";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface MobileContextType {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}

//cast empty object to contexttype
export const MobileContext = createContext<MobileContextType>(
  {} as MobileContextType,
);
export default function MobileTop() {
  const [tab, setTab] = useState<string>("Info");
  const queryClient = new QueryClient();

  const TabDecider = (tab: string) => {
    switch (tab) {
      case "Info":
        return <InfoCard />;
      case "Drank":
        return <MobileList api={"/api/drank"} />;

      case "Drink":
        return <MobileList api={"/api/drink"} />;

      case "Suggest":
        return <SuggestionMobile />;
      default:
        return <Secret />;
    }
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MobileContext.Provider value={{ tab, setTab }}>
          <TabBar />
          {TabDecider(tab)}
        </MobileContext.Provider>
      </QueryClientProvider>
    </>
  );
}
