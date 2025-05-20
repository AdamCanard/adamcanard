"use client";
import GameContainer from "../testcomps/gamecontainer";
import Beer from "./beer";
import Info from "./info";
import { Renderer } from "./renderer/renderer";

export default function MobilePage() {
  return (
    <Renderer
      toRender={{
        Info: <Info key={"Info"} />,
        Beer: <Beer key={"Beer"} />,
        WIP: <GameContainer key={"WIP"} />,
      }}
    />
  );
}
