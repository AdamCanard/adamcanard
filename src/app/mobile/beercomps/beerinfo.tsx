import { useContext } from "react";
import { BeerContext } from "../beer";
import Image from "next/image";

export default function BeerInfo() {
  return (
    <div className={"w-full h-full flex flex-col"}>
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
  const { beer, back } = useContext(BeerContext);
  console.log(beer.image);
  return (
    <div id="border" className={"flex flex-col"}>
      <div className="flex justify-between w-full relative h-8">
        <h1 id="title" className="w-full">
          Beer Info:
        </h1>

        <div id="close-dr" className="absolute" onClick={back}></div>
      </div>

      <div className={"flex flex-row w-full"}>
        {beer.image.length > 0 && (
          <div id="border" className={"w-full"}>
            <Image src={beer.image[0]} alt="beer" />
          </div>
        )}
        <div className={"w-full"}>
          {" "}
          <LabeledBeerData label={"Name"} data={beer.name} />
          <LabeledBeerData label={"Brewery"} data={beer.brewery} />
          <LabeledBeerData label={"Drank"} data={beer.drank} />
          <LabeledBeerData label={"Rating"} data={beer.rating} />
          <LabeledBeerData
            label={"Suggested"}
            data={beer.recommended || "N/A"}
          />
        </div>
      </div>
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
