import { createContext, SetStateAction, useContext, useState } from "react";
import { BeerData } from "../../types";
import Popup from "./popup";
import WindowInternal from "../semanticcomps/windowinternal";
import WindowButton from "../semanticcomps/windowbutton";
import BeerLabel from "./beerlabel";
import { Drink } from "./drink";
import { TaskbarContext } from "../sitecomps/toplevel";

import DraggableWindow from "../semanticcomps/draggablewindow";
import Delete from "./delete";

//type for Popup context
interface PopupContextType {
  rating: number;
  setRating: React.Dispatch<SetStateAction<number>>;
  brewery: string;
  setBrewery: React.Dispatch<SetStateAction<string>>;
  drinkTrigger: boolean;
  setDrinkTrigger: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const PopupContext = createContext<PopupContextType>(
  {} as PopupContextType,
);

export default function BeerPanel(props: { beer: BeerData }) {
  const [rating, setRating] = useState(0);
  const [brewery, setBrewery] = useState("");
  const [drinkTrigger, setDrinkTrigger] = useState(false);
  const { windows, setWindows, beers, setBeers } = useContext(TaskbarContext);
  const handleClose = () => {
    for (let i = 0; i < beers.length; i++) {
      if (beers[i].Beer == props.beer.Beer) {
        const newBeers = beers.toSpliced(i, 1);
        setBeers(newBeers);
      }
    }
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == props.beer.Beer) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  return (
    <PopupContext.Provider
      value={{
        rating,
        setRating,
        brewery,
        setBrewery,
        drinkTrigger,
        setDrinkTrigger,
      }}
    >
      <Popup>
        <DraggableWindow
          title={props.beer.Beer}
          width={"1/2"}
          heigth={"2/3"}
          close={handleClose}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="w-64 h-64 border-2"></div>
            {/* <Image
              src={
                POCKET_BASE_URL +
                "/api/files/" +
                props.BeerData.collectionId +
                "/" +
                props.BeerData.id +
                "/" +
                props.BeerData.Image
              }
              width={250}
              height={250}
              alt="Picture of the Beer"
              onClick={handleClick}
            /> */}
            <WindowInternal>
              <BeerLabel title={"Beer"} data={props.beer.Beer} />
              {props.beer.Brewery && (
                <BeerLabel title={"Brewery"} data={props.beer.Brewery + ""} />
              )}
              {props.beer.Rating != 0 && (
                <BeerLabel title={"Rating"} data={props.beer.Rating + ""} />
              )}
              {props.beer.By && <BeerLabel title={"By"} data={props.beer.By} />}
            </WindowInternal>
            <WindowButton>
              <Delete beer={props.beer} close={handleClose} />
              {!props.beer.Drank && (
                <Drink beer={props.beer} close={handleClose} />
              )}
            </WindowButton>
          </div>
        </DraggableWindow>
      </Popup>
    </PopupContext.Provider>
  );
}
