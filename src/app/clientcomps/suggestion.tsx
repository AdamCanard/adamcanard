"use client";

import { useContext, useState } from "react";
import Window from "../semantics/window";
import WindowButton from "../semantics/windowbutton";
import WindowInternal from "../semantics/windowinternal";
import { LabeledInputStr } from "./labeledinputs";
import { TaskbarContext } from "../sitecomps/toplevel";

export default function Suggestion() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");

  const taskbarContext = useContext(TaskbarContext);

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
          }
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
    formData.append("Name", taskbarContext.username);
    postData(formData);
    setBeer("");
    setBrewery("");
  };

  return (
    <Window title={"New Suggestion"}>
      <form
        className="flex flex-col"
        onSubmit={(e) => handleSubmit(e)}
        autoComplete="off"
      >
        <WindowInternal>
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
            required={false}
          />
        </WindowInternal>
        <WindowButton>
          <input id="button" type="submit" />
        </WindowButton>
      </form>
    </Window>
  );
}
