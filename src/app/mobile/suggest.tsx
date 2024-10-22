import { LabeledInputStr } from "../components/labeledinputs";
import { useState } from "react";
export default function Suggest() {
  const [email, setEmail] = useState("");
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div id="boxshadow" className={"w-full"}>
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <LabeledInputStr
          title="Email"
          state={email}
          setState={setEmail}
          required={true}
        />
        <LabeledInputStr
          title="Beer"
          state={beer}
          setState={setBeer}
          required={true}
        />
        <LabeledInputStr
          title="Brewery"
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
