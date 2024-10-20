import { BeerData } from "../types";
import MobileListElement from "./mobilelistelement";
export default function MobileList(props: { listElements: BeerData[] }) {
  return (
    <>
      <div className="overflow-y-scroll w-full h-full flex flex-col">
        {/* For each database object in list elements */}
        {props.listElements.map((listElement, index) => {
          return <MobileListElement data={listElement} key={index} />;
        })}
      </div>
    </>
  );
}
