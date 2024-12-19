import { useContext } from "react";
import { MobileContext } from "./mobiletop";
import ListBar from "./listbar";
import MobileList from "./mobilelist";

export default function MobileLists() {
  const { list } = useContext(MobileContext);

  const ListDecider = (list: string) => {
    switch (list) {
      case "Info":
        return <></>;
      default:
        return <MobileList api="/api/drank" />;
    }
  };

  return (
    <>
      <ListBar />
      {ListDecider(list)}`
    </>
  );
}
