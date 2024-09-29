"use client";

import { useContext, useState } from "react";

import WindowButton from "../semantics/windowbutton";
import WindowInternal from "../semantics/windowinternal";
import { LabeledInputStr } from "./labeledinputs";
import { TaskbarContext } from "../sitecomps/toplevel";
import DraggableWindow from "../semantics/draggablewindow";

export default function Suggestion() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");

  const { username, windows, setWindows } = useContext(TaskbarContext);

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
    formData.append("Name", username);
    postData(formData);
    setBeer("");
    setBrewery("");
  };

  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "Suggestion") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  return (
    <DraggableWindow
      title={"New Suggestion"}
      width={"72"}
      heigth={"2/3"}
      close={handleClose}
    >
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
    </DraggableWindow>
  );
}
