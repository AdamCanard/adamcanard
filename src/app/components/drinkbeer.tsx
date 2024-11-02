import { useState } from "react";
import { LabeledInputStr } from "./labeledinputs";
import DesktopWindow from "./sitecomps/desktopwindow";

export default function DrinkBeer() {
  const [beer, setBeer] = useState<string>("");
  const [brewery, setBrewery] = useState<string>("");

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/drinkingbeer/", {
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
          required={false}
        />
        <div id="button-i">
          <input id="button" type="submit" value="Drink" />
        </div>
      </form>
    </DesktopWindow>
  );
}
