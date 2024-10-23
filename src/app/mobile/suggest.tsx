import { LabeledInputStr } from "../components/labeledinputs";
import { useState } from "react";
export default function Suggest() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/newSuggestion/", {
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
