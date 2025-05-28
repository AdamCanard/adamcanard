import { useContext, useState } from "react";
import { BeerContext } from "../beer";

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
          <LabeledBeerInput label="Name" name="name" type="text" />
          <BrewerySelect />
          <RatingInput />
          <LabeledBeerInput label="Suggested" name="recommended" type="text" />
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
function RatingInput() {
  const [rating, setRating] = useState(0);
  const changeRating = (newRating: number) => {
    if (newRating > 0 && newRating <= 10) {
      setRating(newRating);
    }
  };
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>Rating:</label>
      <input
        className={"w-full"}
        type="number"
        name={"rating"}
        value={rating}
        onChange={(e) => changeRating(+e.target.value)}
      />{" "}
    </div>
  );
}

function BrewerySelect() {
  const { beers } = useContext(BeerContext);
  const [selected, setSelected] = useState("");
  const breweries = [...new Set(beers.map((beer) => beer.brewery))];
  return (
    <div id={"border"} className={"w-full flex justify-between items-center"}>
      <label className={"pl-1 w-full"}>Brewery:</label>
      {selected === "~" ? (
        <div className={"w-full relative"}>
          {" "}
          <input className={"w-full"} type="text" name="brewery" />{" "}
          <div
            id="close-dr"
            className="absolute"
            onClick={() => setSelected("")}
          ></div>
        </div>
      ) : (
        <select
          name={"brewery"}
          className={"w-full Border"}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        >
          <option value={""} disabled selected>
            -- Select a Brewery --
          </option>
          <option value="~">-- New Brewery --</option>
          {breweries.map((brewery) => {
            return (
              <option value={brewery} key={brewery}>
                {brewery}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
}
