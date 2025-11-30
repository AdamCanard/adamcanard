import { useContext } from "react";
import { BeerContext } from "../beer";

export default function NewBeer() {
  const { addBeer } = useContext(BeerContext);
  return (
    <div id="button" className={"absolute bottom-3 right-3"} onClick={addBeer}>
      New Beer
    </div>
  );
}
