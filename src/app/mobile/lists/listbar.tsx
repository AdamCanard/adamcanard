import ListButton from "./listbutton";

export default function ListBar() {
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <ListButton title="drank" />
          <ListButton title="suggestions" />
          <ListButton title="ideas" />
        </div>
      </div>
    </>
  );
}
