import { useContext } from "react";
import { BeerContext } from "../beer";
import Image from "next/image";
import Link from "next/link";

export default function BeerInfo() {
  const { drinkBeer } = useContext(BeerContext);
  return (
    <div className={"w-full h-full flex flex-col"}>
      <BasicBeerInfo />
      <BeerKeyword />
      <BeerReview />
      <BeerDescription />
      <div
        id="button"
        className={"absolute bottom-3 right-3"}
        onClick={drinkBeer}
      >
        Drink Beer
      </div>
    </div>
  );
}

function BeerReview() {
  const { beer } = useContext(BeerContext);
  return (
    <div id="border" className={"w-full flex flex-col "}>
      <h1 id="title">Beer Review:</h1>{" "}
      {beer.review === "" ? (
        "No Review For This Beer"
      ) : (
        <Link href={beer.review || ""} />
      )}
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
          <div id="border" className={"w-full relative"}>
            <Image src={beer.image[0]} alt="beer" fill />
          </div>
        )}
        <div className={"w-full"}>
          {" "}
          <LabeledBeerData label={"Name"} data={beer.name} />
          <LabeledBeerData label={"Brewery"} data={beer.brewery} />
          <LabeledBeerData label={"Drank"} data={beer.drank || 0} />
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
