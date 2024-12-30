import TabButton from "./tabbutton";
export default function TabBar() {
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <TabButton title="Info" nav="/mobile" />

          <TabButton title="Lists" nav="/mobile/lists" />
        </div>
      </div>
    </>
  );
}
