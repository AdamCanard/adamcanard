"use client";
//import GameContainer from "../testcomps/gamecontainer";
import Beer from "./beer";
import Info from "./info";
import StoreRecipe from "./recipe/storerecipe";
import { Renderer } from "./renderer/renderer";

export default function MobilePage() {
  return (
    <Renderer
      toRender={{
        Info: <Info key={"Info"} />,
        Beer: <Beer key={"Beer"} />,
        Recipe: <StoreRecipe key={"Recipe"} />,
      }}
    />
  );
}
