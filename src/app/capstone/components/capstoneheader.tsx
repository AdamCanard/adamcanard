import HeaderButton from "./headerbutton";

export default function CapstoneHeader() {
  return (
    <div className={"w-full h-8 flex flex-row "}>
      <HeaderButton title={"Team"} route={"team"} />
      <HeaderButton title={"Demo"} route={"demo"} />
      <HeaderButton title={"References"} route={"references"} />
    </div>
  );
}
