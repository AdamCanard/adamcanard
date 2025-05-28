import { useContext } from "react";
import { BeerContext } from "../beer";

enum BeerSelect {
  "brewery" = "brewery",
}

export default function BeerAdder() {
  const { back } = useContext(BeerContext);
  return (
    <div className={"w-full h-full flex flex-col"}>
      <div id="border" className={"flex flex-col"}>
        <div className="flex justify-between w-full relative h-8">
          <h1 id="title" className="w-full">
            Enter Beer Info:
          </h1>
          <div id="close-dr" className="absolute" onClick={back}></div>
        </div>
        <div className={"w-full"}>
          <LabeledBeerInput label="Name" name="Name" type="text" />
          <LabeledBeerSelect category={BeerSelect.brewery} />
        </div>
      </div>
    </div>
  );
}
function LabeledBeerInput(props: {
  type: string;
  label: string;
  name: string;
}) {
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>{props.label}:</label>
      <input className={"w-full"} type={props.type} name={props.name} />{" "}
    </div>
  );
}

function LabeledBeerSelect(props: { category: string }) {
  const capitalize = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>{capitalize(props.category)}:</label>
      <select name={""} className={"w-full Border"}></select>
    </div>
  );
}
