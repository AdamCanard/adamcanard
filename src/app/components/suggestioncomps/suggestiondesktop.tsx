"use client";

import { useContext, useState } from "react";
import { TaskbarContext } from "../sitecomps/toplevel";
import DraggableWindow from "../semanticcomps/draggablewindow";
import { postData } from "./suggestionpost";
import { LabeledInputStr } from "../labeledinputs";

export default function SuggestionDesktop() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const { windows, setWindows, username } = useContext(TaskbarContext);

  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "Suggestion") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };
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
    <DraggableWindow
      title={"Suggest A Beer!"}
      width={"72"}
      heigth={"2/3"}
      windowKey="Suggestion"
      close={handleClose}
    >
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
    </DraggableWindow>
  );
}
