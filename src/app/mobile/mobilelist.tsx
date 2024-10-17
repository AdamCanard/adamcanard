import { BeerData } from "../types";
import BeerListElement from "../components/beerlistelement";
export default function MobileList(props: { listElements: BeerData[] }) {
  return (
    <>
      <div className="w-full h-96 flex flex-col">
        {/* For each database object in list elements */}
        {props.listElements.map((listElement, index) => {
          return <BeerListElement data={listElement} key={index} />;
        })}
      </div>
    </>
  );
}
