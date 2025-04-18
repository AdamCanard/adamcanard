import Active from "./location/active";
import Counting from "./location/counting";
import { LocationRenderer } from "./location/renderer/renderer";
import Starting from "./location/starting";

export default function Location() {
  return (
    <div
      className={
        "flex bg-background flex-col w-full h-full items-center justify-start"
      }
    >
      <LocationRenderer
        toRender={{
          Starting: <Starting key={"Starting"} />,
          Counting: <Counting key={"Counting"} />,
          Active: <Active key={"Active"} />,
        }}
      />
    </div>
  );
}
