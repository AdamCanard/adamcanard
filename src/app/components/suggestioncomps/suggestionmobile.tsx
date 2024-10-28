import { LabeledInputStr } from "../labeledinputs";
import { useState } from "react";
import { postData } from "./suggestionpost";
export default function SuggestionMobile() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    postData(formData);
    setBeer("");
    setBrewery("");
  };

  return (
    <div id="boxshadow" className={"w-full"}>
      <h1 id="title">Suggest A Beer!</h1>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
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
        <div id="button-i">
          <input id="button" type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
