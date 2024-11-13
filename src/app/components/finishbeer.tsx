import { useState } from "react";
import { BeerData } from "../types";
import DesktopWindow from "./sitecomps/desktopwindow";
import { LabeledInputNum, LabeledInputStr } from "./labeledinputs";

export default function FinishBeer(props: { beer: BeerData }) {
  const [beer, setBeer] = useState<string>(props.beer.Beer);
  const [brewery, setBrewery] = useState<string>(props.beer.Brewery || "");
  const [rating, setRating] = useState<number>(0);

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/drinkbeer/", {
        method: "POST",
        body: formData,
      });
      return response;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      } else {
        console.log(err);
      }
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("Drank", false);
    formData.append("Start", Date.now());
    await postData(formData);
    setBeer("");
    setBrewery("");
  };
  return (
    <DesktopWindow title="Drink A Beer!" width="20rem" height="">
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
    </DesktopWindow>
  );
}
