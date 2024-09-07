import Header from "./header";
import Body from "./body";

export default function Frontpage() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <Header />
      <Body />
    </div>
  );
}
