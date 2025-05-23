import { useContext } from "react";
import { BeerContext } from "../beer";

export default function BeerInfo() {
  const { back } = useContext(BeerContext);

  return (
    <div className={"w-full h-full flex flex-col"}>
      <div
        id="border"
        className={"w-full flex justify-between h-9 items-start"}
      >
        <button
          className={"w-6 h-full text-3xl leading-0 hover:cursor-pointer"}
          onClick={back}
        >
          {"<"}
        </button>
        <div className={"h-9 w-full"}></div>
        <button className={"w-6 h-full text-3xl leading-0"}>{"+"}</button>
      </div>
      <BasicBeerInfo />
      <BeerKeyword />
      <BeerDescription />
    </div>
  );
}
function LabeledBeerData(props: { label: string; data: string | number }) {
  return (
    <div id={"border"} className={"w-full flex justify-between"}>
      <label>{props.label}:</label>
      <div>{props.data}</div>
    </div>
  );
}
function BasicBeerInfo() {
  const { beer } = useContext(BeerContext);
  return (
    <div id="border" className={"flex flex-col"}>
      <h1 id="title"> Beer Info:</h1>{" "}
      <LabeledBeerData label={"Name"} data={beer.name} />
      <LabeledBeerData label={"Brewery"} data={beer.brewery} />
      <LabeledBeerData label={"Time"} data={beer.time} />
      <LabeledBeerData label={"Rating"} data={beer.rating} />
    </div>
  );
}
function BeerKeyword() {
  const { beer, keywords, addKeyword, removeKeyword } = useContext(BeerContext);
  return (
    <div id="border" className={"flex gap-x-2 flex-wrap"}>
      <h1 id="title"> Keywords</h1>

      {beer.keywords && beer.keywords.length !== 0 ? (
        <>
          {beer.keywords.map((keyword) => {
            return (
              <div
                className={`${keywords.includes(keyword) ? "Keyword-active" : "Keyword"}`}
                key={keyword}
                onClick={() => {
                  if (keywords.includes(keyword)) {
                    removeKeyword(keyword);
                  } else {
                    addKeyword(keyword);
                  }
                }}
              >
                {keyword}
              </div>
            );
          })}
        </>
      ) : (
        <>Beer Has No Keywords</>
      )}
    </div>
  );
}
function BeerDescription() {
  const { beer } = useContext(BeerContext);
  return (
    <div id="border" className={"w-full flex flex-col h-full"}>
      <h1 id="title">Description</h1>

      {beer.desc === "" ? "No Description For This Beer" : beer.desc}
    </div>
  );
}
