import ListButton from "./listbutton";

export default function ListBar() {
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <ListButton title="Drank" nav="/mobile/lists/drank" />
          <ListButton title="Suggestions" nav="/mobile/lists/suggestions" />
          <ListButton title="Ideas" nav="/mobile/lists/ideas" />
        </div>
      </div>
    </>
  );
}
