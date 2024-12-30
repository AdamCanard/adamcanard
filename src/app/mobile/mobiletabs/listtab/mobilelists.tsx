import { useContext } from "react";
import { MobileContext } from "../../page";
import ListBar from "./listbar";
import MobileList from "./mobilelist";

export default function MobileLists() {
  const { list } = useContext(MobileContext);

  const ListDecider = (list: string) => {
    switch (list) {
      case "Drank":
        return <MobileList api="/api/drank" open={false} />;
      case "Drink":
        return <MobileList api="/api/drink" open={false} />;
      case "Suggestions":
        return <MobileList api="/api/suggestion" open={true} />;
      case "Ideas":
        return <MobileList api="/api/idea" open={false} />;
      default:
        return <MobileList api="/api/drank" open={false} />;
    }
  };

  return (
    <>
      <ListBar />
      {ListDecider(list)}
    </>
  );
}
