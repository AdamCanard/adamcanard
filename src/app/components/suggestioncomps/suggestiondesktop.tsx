"use client";

import { useContext, useState } from "react";
import { TaskbarContext } from "../sitecomps/toplevel";
import { postData } from "./suggestionpost";
import { LabeledInputStr } from "../labeledinputs";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function SuggestionDesktop() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const { username } = useContext(TaskbarContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("Username", username);
    postData(formData);
    setBeer("");
    setBrewery("");
  };

  return (
    <DesktopWindow title={"Suggest A Beer!"} width={"72"} height={"2/3"}>
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
    </DesktopWindow>
  );
}
