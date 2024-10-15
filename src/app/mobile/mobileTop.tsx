export default function MobileTop() {
  return (
    <>
      <div className={"w-full h-8 flex flex-row"}>
        <TabButton title="Drank" />
        <TabButton title="Drink" />
      </div>
      <div id="Mwindow" className={"w-full h-full"}></div>
    </>
  );
}

export function TabButton(props: { title: string }) {
  return (
    <div
      id="MTabButton"
      className={"w-24 h-full text-center leading-8 hover:cursor-pointer"}
    >
      {props.title}
    </div>
  );
}
