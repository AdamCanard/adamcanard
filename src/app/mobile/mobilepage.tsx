"use client";
import GameContainer from "../testcomps/gamecontainer";
import Info from "./info";
import MobileList from "./listcomps/mobilelist";
import MobileOpenList from "./listcomps/mobileopenlist";
import { Renderer } from "./renderer/renderer";

export default function MobilePage() {
  return (
    <Renderer
      toRender={{
        Info: <Info key={"Info"} />,
        Lists: (
          <Renderer
            key={"Lists"}
            toRender={{
              Beers: <MobileList open={false} title="Beers" key={"Beers"} />,
              Suggestion: (
                <MobileOpenList
                  open={true}
                  title="Suggestion"
                  key={"Suggestion"}
                />
              ),
              Vinyls: <MobileList open={false} title="Vinyls" key={"Vinyls"} />,
              Ideas: <MobileList open={false} title="Ideas" key={"Ideas"} />,
            }}
          />
        ),
        WIP: <GameContainer key={"WIP"} />,
      }}
    />
  );
}
