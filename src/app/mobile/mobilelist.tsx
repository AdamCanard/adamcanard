import { BeerData } from "../types";
import BeerListElement from "../components/beerlistelement";
export default function MobileList(props: { listElements: BeerData[] }) {
  return (
    <>
      <div className="overflow-y-scroll w-full h-full flex flex-col">
        {/* For each database object in list elements */}
        {props.listElements.map((listElement, index) => {
          return <BeerListElement data={listElement} key={index} />;
        })}
      </div>
    </>
  );
}
