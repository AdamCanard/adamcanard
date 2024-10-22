import { useContext } from "react";
import TabButton from "./tabbutton";
import { MobileContext } from "./mobiletop";

export default function TabBar() {
  const { setTab } = useContext(MobileContext);
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <TabButton title="Info" set={setTab} />

          <TabButton title="Drank" set={setTab} />
          <TabButton title="Drink" set={setTab} />
          <TabButton title="Suggest" set={setTab} />
        </div>
      </div>
    </>
  );
}
