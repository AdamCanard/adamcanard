export default function Home() {
  return (
    <div className={"GridSize border-2 flex flex-col justify-around"}>
      <div className={"w-full text-3xl text-center"}>Made Games</div>
      <div className={"w-full flex flex-col gap-4  items-center"}>
        <HomeButton title="Play" screen="grid" />
        <HomeButton title="Skip" screen="grid" />
        <HomeButton title="Credits" screen="grid" />
      </div>
    </div>
  );
}

function HomeButton(props: { title: string; screen: string }) {
  return (
    <button className={"HomeButton text-center text-xl w-2/3"}>
      {props.title}
    </button>
  );
}
