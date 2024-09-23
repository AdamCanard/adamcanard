import { BeerData } from "../types";
import List from "./list";

export default function BeerLists(props: { listData: BeerData[] }) {
  return (
    <>
      {props.listData && (
        <>
          <div className="col-span-1 row-span-2">
            <List
              Title="Drank"
              listElements={props.listData.filter(
                (element) => element.Drank == true
              )}
            />
          </div>
          <div className="col-span-1 row-span-2">
            <List
              Title="Drink"
              listElements={props.listData.filter(
                (element) => element.Drank == false
              )}
            />
          </div>
        </>
      )}
    </>
  );
}
