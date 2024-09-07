"use client";

import { BeerList } from "./beerlist";
import { createContext, SetStateAction, useState } from "react";

interface BackgroundContextType {
  beerImages: string[];
  setBeerImages: React.Dispatch<SetStateAction<string[]>>;
}

export const BackgroundContext = createContext<BackgroundContextType>(
  {} as BackgroundContextType
);

export default function DynamicBackground(props: {
  children?: React.ReactNode;
}) {
  const [beerImages, setBeerImages] = useState<string[]>(BeerList);
  return (
    <div className="relative flex flex-col w-screen h-screen overflow-clip">
      {beerImages.map((image: string, index: number) => {
        return <HorizontalLine image={image} offset={index} key={index} />;
      })}
      <div className="z-10">
        <BackgroundContext.Provider value={{ beerImages, setBeerImages }}>
          {props.children}
        </BackgroundContext.Provider>
      </div>
    </div>
  );
}

function HorizontalLine(props: { image: string; offset: number }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "120vw",
        height: "7rem",
        backgroundImage: "url(" + props.image + ")",
        backgroundRepeat: "repeat-x",
        backgroundPositionX: props.offset * -3 + "rem",
        marginTop: (props.offset - 1) * 7 - 1 + "rem",
        animation:
          "roll -" +
          props.offset +
          "s " +
          props.offset +
          "s ease-in-out infinite",
      }}
    ></div>
  );
}
