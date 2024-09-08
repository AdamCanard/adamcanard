import { createContext, SetStateAction, useState } from "react";
import { BeerData } from "../types";
import Popup from "./popup";
import Window from "./window";
import WindowInternal from "./windowinternal";
import WindowButton from "./windowbutton";
import BeerLabel from "./beerlabel";
import { Drink } from "./drink";

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
  {} as PopupContextType
);

export default function BeerPanel(props: { beer: BeerData }) {
  const [rating, setRating] = useState(0);
  const [brewery, setBrewery] = useState("");
  const [drinkTrigger, setDrinkTrigger] = useState(false);

  return (
    <div className="w-full h-screen flex justify-center ">
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
          <div className="w-96 ">
            <Window title={props.beer.Beer}>
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
                    <BeerLabel
                      title={"Brewery"}
                      data={props.beer.Brewery + ""}
                    />
                  )}
                  {props.beer.Rating != 0 && (
                    <BeerLabel title={"Rating"} data={props.beer.Rating + ""} />
                  )}
                  {props.beer.By && (
                    <BeerLabel title={"By"} data={props.beer.By} />
                  )}
                </WindowInternal>
                <WindowButton>
                  {!props.beer.Drank && <Drink beer={props.beer} />}
                </WindowButton>
              </div>
            </Window>
          </div>
        </Popup>
      </PopupContext.Provider>
    </div>
  );
}
