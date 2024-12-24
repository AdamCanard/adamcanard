import RecyclingBin from "../applications/recyclingbin";
import Application from "./application";

export default function DesktopApplications() {
  return (
    <div className={"grid w-full h-full grid-cols-9 grid-rows-5"}>
      <Application
        title="Recycling Bin"
        src=""
        window={<RecyclingBin key={"Recycling Bin"} />}
      />
    </div>
  );
}
