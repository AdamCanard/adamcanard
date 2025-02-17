import Info from "./info";
import MobileList from "./listcomps/mobilelist";
import { Renderer } from "./renderer/renderer";

export default function MobilePage() {
  return (
    <Renderer
      toRender={{
        Info: <Info key={"Info"} />,
        Lists: (
          <Renderer
            toRender={{
              Beers: <MobileList open={false} title={"Beers"} />,
              Suggestion: <MobileList open={true} title={"Suggestion"} />,
              Vinyls: <MobileList open={false} title={"Vinyls"} />,
              Ideas: <MobileList open={false} title={"Ideas"} />,
            }}
          />
        ),
      }}
    />
  );
}
