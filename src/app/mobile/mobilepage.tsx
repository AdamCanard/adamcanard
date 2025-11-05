"use client";
import { Suspense } from "react";
//import GameContainer from "../testcomps/gamecontainer";
import Beer from "./beer";
import Info from "./info";
import StoreRecipe from "./recipe/storerecipe";
import { Renderer } from "./renderer/renderer";
import Loading from "../desktop/sitecomps/loading";

export default function MobilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Renderer />
    </Suspense>
  );
}

export const library: Record<string, JSX.Element> = {
  Info: <Info key={"Info"} />,
  Adam: <Beer key={"Adam"} />,
  Recipe: <StoreRecipe key={"Recipe"} />,
};
