import { useContext } from "react";
import { MobileContext } from "./mobiletop";
import ListButton from "./listbutton";

export default function ListBar() {
  const { setList } = useContext(MobileContext);
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <ListButton title="Drank" set={setList} />
          <ListButton title="Drink" set={setList} />
          <ListButton title="Suggestions" set={setList} />
          <ListButton title="Ideas" set={setList} />
        </div>
      </div>
    </>
  );
}
