import { useContext } from "react";
import { PopupContext } from "./beerpanel";
import Window from "../semanticcomps/window";
import WindowInternal from "../semanticcomps/windowinternal";
import WindowButton from "../semanticcomps/windowbutton";

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
          <div className="absolute flex max-h-full justify-center items-center">
            <Window
              title="Drinking This Beer"
              close={() => {
                popupData.setDrinkTrigger(false);
              }}
            >
              <WindowInternal>
                <label id="border" className="flex justify-between">
                  Enter Rating:
                  <input
                    type="text"
                    name="Rating"
                    value={popupData.rating || ""}
                    onChange={(e) => popupData.setRating(+e.target.value)}
                  />
                </label>
                <label id="border" className="flex justify-between">
                  Enter Brewery:
                  <input
                    type="text"
                    name="Brewery"
                    value={popupData.brewery}
                    onChange={(e) => popupData.setBrewery(e.target.value)}
                  />
                </label>
              </WindowInternal>
              <WindowButton>
                <input id="button" type="submit" onClick={handleSubmit} />
              </WindowButton>
            </Window>
          </div>
          <div className="opacity-25 pointer-events-none">{props.children}</div>
        </>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
}
