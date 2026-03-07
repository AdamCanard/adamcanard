import { IBeer } from "@/app/server/models/beer";
import Image from "next/image";
import { useState } from "react";
import BeerWindow from "./beerwindow";

const beer: IBeer = { name: "", brewery: "", image: [], rating: 0 };
export default function BeerScroller() {
  return (
    <ScrollableBeer>
      <BeerScreen />
    </ScrollableBeer>
  );
}

function BeerScreen() {
  return (
    <div
      className={"bg-[#c6c6c6] flex flex-col w-full h-full  overflow-y-hidden"}
    >
      <BeerWindow>
        <div className={"w-full h-full flex flex-col"}>
          <BeerImage />
          <BeerDescription />
        </div>
      </BeerWindow>
    </div>
  );
}

function ScrollableBeer(props: { children: JSX.Element }) {
  return <>{props.children}</>;
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
    <div className={"Border h-2/3 relative"}>
      {beer.image.length > 0 && (
        <div
          id="border"
          className={"w-full relative cursor-pointer"}
          onClick={next}
        >
          <Image src={beer.image[beerIndex]} alt="beer" fill />
        </div>
      )}
      <BeerScore />
    </div>
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
    <div className={"Border w-full flex flex-col h-1/3 "}>
      <h1 className={"Title"}>Description</h1>

      {"No Description For This Beer"}
    </div>
  );
}
function BeerScore() {
  return (
    <div
      className={
        "Border absolute w-16 flex flex-col bottom-2 right-2 text-7xl text-center items-center justify-center leading-18"
      }
    >
      7
    </div>
  );
}
