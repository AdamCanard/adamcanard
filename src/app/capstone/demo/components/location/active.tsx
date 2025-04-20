import { useContext } from "react";
import ActiveCalculator from "./activecomps/activecalculator";
import HostedPop from "./activecomps/hostedpop";
import { RenderContext } from "@/app/capstone/renderer/renderer";

export default function Active() {
  const renderer = useContext(RenderContext);
  const handleClick = async () => {
    renderer.setWindowToRender(renderer.toRender["Home"]);
  };

  return (
    <div className={"w-full h-full flex items-center flex-col gap-2"}>
      <HostedPop />
      <ActiveCalculator />
      <button
        type="button"
        onClick={() => handleClick()}
        className={"border-2 border-black p-2"}
      >
        close event
      </button>
    </div>
  );
}
