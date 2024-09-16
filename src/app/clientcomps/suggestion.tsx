"use client";

import { useState } from "react";
import Window from "../semantics/window";
import WindowButton from "../semantics/windowbutton";
import WindowInternal from "../semantics/windowinternal";
import LabeledInput from "./labeledinput";

export interface IInputs {
  Beer: string;
  Brewery: string;
  Name: string;
}

export default function Suggestion() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const [name, setName] = useState("");

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/newSuggestion/", {
        method: "POST",
        body: formData,
      });
      return response;
    } catch (err: unknown) {
      if (typeof err === "string") {
        console.log(err);
      } else if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
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
    setName("");
  };

  return (
    <Window title={"New Suggestion"}>
      <form
        className="flex flex-col"
        onSubmit={(e) => handleSubmit(e)}
        autoComplete="off"
      >
        <WindowInternal>
          <LabeledInput
            title="Beer"
            state={beer}
            setState={setBeer}
            required={true}
          />
          <LabeledInput
            title="Brewery"
            state={brewery}
            setState={setBrewery}
            required={false}
          />
          <LabeledInput
            title="Name"
            state={name}
            setState={setName}
            required={true}
          />
        </WindowInternal>
        <WindowButton>
          <input id="button" type="submit" />
        </WindowButton>
      </form>
    </Window>
  );
}
