import { IBeer } from "@/app/server/models/beer";
import Image from "next/image";
import { useState } from "react";

const beer: IBeer = { name: "", brewery: "", image: [], rating: 0 };
export default function BeerScroller() {
  return (
    <div
      className={
        "bg-[#c6c6c6] flex flex-col w-full h-full relative overflow-y-hidden"
      }
    >
      <div className={"w-full h-full flex flex-col"}>
        <BeerImage />
        <BeerDescription />
      </div>
    </div>
  );
}
//function BeerReview() {
//  return (
//    <div id="border" className={"w-full flex flex-col "}>
//      <h1 id="title">Beer Review:</h1>{" "}
//      {beer.review === "" ? (
//        "No Review For This Beer"
//      ) : (
//        <Link href={beer.review || ""} className={"Border"}>
//          {beer.review}
//        </Link>
//      )}
//    </div>
//  );
//}

//function LabeledBeerData(props: { label: string; data: string | number }) {
//  return (
//    <div id={"border"} className={"w-full flex justify-between"}>
//      <label>{props.label}:</label>
//      <div>{props.data}</div>
//    </div>
//  );
//}
function BeerImage() {
  const [beerIndex, setBeerIndex] = useState(0);
  const next = () => {
    if (beerIndex === beer.image.length - 1) {
      setBeerIndex(0);
    } else {
      const newBeerIndex = beerIndex + 1;
      setBeerIndex(newBeerIndex);
    }
  };
  return (
    <>
      {beer.image.length > 0 && (
        <div
          id="border"
          className={"w-full relative cursor-pointer"}
          onClick={next}
        >
          <Image src={beer.image[beerIndex]} alt="beer" fill />
        </div>
      )}
    </>
  );
}
//function BasicBeerInfo() {
//  const { beer, back } = useContext(BeerContext);
//  return (
//    <div id="border" className={"flex flex-col"}>
//      <div className="flex justify-between w-full relative h-8">
//        <h1 id="title" className="w-full">
//          Beer Info:
//        </h1>
//
//        <div id="close-dr" className="absolute" onClick={back}></div>
//      </div>
//
//      <div className={"flex flex-row w-full"}>
//        <BeerImage />
//        <div className={"w-full"}>
//          {" "}
//          <LabeledBeerData label={"Name"} data={beer.name} />
//          <LabeledBeerData label={"Brewery"} data={beer.brewery} />
//          <LabeledBeerData label={"Drank"} data={beer.drank || 0} />
//          <LabeledBeerData label={"Rating"} data={beer.rating} />
//          <LabeledBeerData
//            label={"Suggested"}
//            data={beer.recommended || "N/A"}
//          />
//        </div>
//      </div>
//    </div>
//  );
//}

function BeerDescription() {
  return (
    <div id="border" className={"w-full flex flex-col h-full"}>
      <h1 id="title">Description</h1>

      {beer.desc === "" ? "No Description For This Beer" : beer.desc}
    </div>
  );
}
