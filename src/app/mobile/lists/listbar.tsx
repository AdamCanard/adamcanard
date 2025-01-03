import ListButton from "./listbutton";

export default function ListBar() {
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <ListButton title="Beers" nav="/mobile/lists/beers" />
          <ListButton title="Suggestion" nav="/mobile/lists/suggestion" />
          <ListButton title="Ideas" nav="/mobile/lists/ideas" />
        </div>
      </div>
    </>
  );
}
