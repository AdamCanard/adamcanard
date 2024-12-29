import RecyclingBin from "../applications/recyclingbin";
import Application from "./application";
import RecyclingBinImg from "../../../../public/Windows/RecyclingBin.png";

export default function DesktopApplications() {
  return (
    <div className={"grid w-full h-full grid-cols-12 grid-rows-5"}>
      <Application
        title="Recycling Bin"
        src={RecyclingBinImg}
        window={<RecyclingBin key={"Recycling Bin"} />}
      />
    </div>
  );
}
