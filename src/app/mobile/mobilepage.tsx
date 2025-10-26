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
      <Renderer
        toRender={{
          Info: <Info key={"Info"} />,
          Beer: <Beer key={"Beer"} />,
          Recipe: <StoreRecipe key={"Recipe"} />,
        }}
      />
    </Suspense>
  );
}
