import { Dispatch, SetStateAction, useState, createContext } from "react";
import InfoCard from "./mobiletabs/maintab/infocard";
import TabBar from "./tabbar";
import Secret from "./mobiletabs/maintab/secret";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MobileLists from "./mobiletabs/listtab/mobilelists";
interface MobileContextType {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  list: string;
  setList: Dispatch<SetStateAction<string>>;
}

//cast empty object to contexttype
export const MobileContext = createContext<MobileContextType>(
  {} as MobileContextType,
);
export default function MobileTop() {
  const [tab, setTab] = useState<string>("Info");
  const [list, setList] = useState<string>("Drank");
  const queryClient = new QueryClient();

  const TabDecider = (tab: string) => {
    switch (tab) {
      case "Info":
        return <InfoCard />;
      case "Lists":
        return <MobileLists />;
      default:
        return <Secret />;
    }
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MobileContext.Provider value={{ tab, setTab, list, setList }}>
          <TabBar />
          {TabDecider(tab)}
        </MobileContext.Provider>
      </QueryClientProvider>
    </>
  );
}
