import { useState, useContext } from "react";
import { BeerData } from "../../types";
import BeerLabel from "./beerlabel";
import { TaskbarContext } from "../sitecomps/toplevel";
import Delete from "./delete";
import { LabeledInputNum, LabeledInputStr } from "../labeledinputs";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function BeerPanel(props: { beer: BeerData }) {
  const [rating, setRating] = useState(0);
  const [brewery, setBrewery] = useState("");
  const [beer, setBeer] = useState(props.beer.Beer);
  const [drinkTrigger, setDrinkTrigger] = useState(false);
  const { windows, setWindows, beers, setBeers, admin, setRefreshBeers } =
    useContext(TaskbarContext);

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

  const drinkBeer = async (formData: FormData) => {
    try {
      const response = await fetch("/api/drinkbeer/", {
        method: "POST",
        body: formData,
      });
      await response.json();
      setRefreshBeers(true);
      handleClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating != 0 && brewery != "") {
      const formData = new FormData();
      formData.append("id", props.beer.id);
      formData.append("Beer", props.beer.Beer);
      formData.append("Brewery", brewery);
      formData.append("By", props.beer.By);
      formData.append("Rating", rating);
      formData.append("Drank", true);
      drinkBeer(formData);
    }
  };

  return (
    <DesktopWindow
      title={props.beer.Beer}
      width={"1/2"}
      height={"2/3"}
      close={handleClose}
    >
      <div className="flex flex-col justify-center items-center">
        {drinkTrigger ? (
          <>
            <form
              className="flex flex-col"
              onSubmit={(e) => handleSubmit(e)}
              autoComplete="off"
            >
              <LabeledInputStr
                title="Beer"
                type="text"
                state={beer}
                setState={setBeer}
                required={true}
              />
              <LabeledInputStr
                title="Brewery"
                type="text"
                state={brewery}
                setState={setBrewery}
                required={true}
              />
              <LabeledInputNum
                title="Rating"
                state={rating}
                setState={setRating}
                required={true}
              />
            </form>
            <div id="button-i">
              <input id="button" type="submit" value="Finish" />
            </div>
          </>
        ) : (
          <>
            <BeerLabel title={"Beer"} data={props.beer.Beer} />
            {props.beer.Brewery && (
              <BeerLabel title={"Brewery"} data={props.beer.Brewery + ""} />
            )}
            {props.beer.Rating != 0 && (
              <BeerLabel title={"Rating"} data={props.beer.Rating + ""} />
            )}
            {props.beer.By && <BeerLabel title={"By"} data={props.beer.By} />}
            {admin ? (
              <div id="button-i">
                <Delete beer={props.beer} close={handleClose} />
                {!props.beer.Drank && (
                  <div id="border" onClick={() => setDrinkTrigger(true)}>
                    Drink Me!
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </DesktopWindow>
  );
}
