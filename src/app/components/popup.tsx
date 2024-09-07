import { useContext } from "react";
import { PopupContext } from "./beerviewer";

export default function Popup(props: { children?: React.ReactNode }) {
  const popupData = useContext(PopupContext);

  //on submit if values are good, disable popup
  const handleSubmit = () => {
    if (popupData.rating != 0 && popupData.brewery != "") {
      popupData.setDrinkTrigger(false);
    }
  };
  return (
    <>
      {/* popup enabled by drink button */}
      {popupData.drinkTrigger ? (
        <>
          <div className="absolute flex w-full h-full justify-center items-center">
            <div className=" w-80 border-2 border-black bg-white z-10 p-2">
              <label className="flex justify-between">
                Enter Rating:
                <input
                  className="border-2 border-black"
                  type="text"
                  name="Rating"
                  value={popupData.rating || ""}
                  onChange={(e) => popupData.setRating(+e.target.value)}
                />
              </label>
              <label className="flex justify-between">
                Enter Brewery:
                <input
                  className="border-2 border-black"
                  type="text"
                  name="Brewery"
                  value={popupData.brewery}
                  onChange={(e) => popupData.setBrewery(e.target.value)}
                />
              </label>
              <div
                onClick={handleSubmit}
                className=" w-16 h-6 border-2 border-black hover:cursor-pointer leading-5 pl-1"
              >
                Submit
              </div>
            </div>
          </div>
          <div className="opacity-25 pointer-events-none">{props.children}</div>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
