import { useContext, useState } from "react";
import WindowButton from "./semanticcomps/windowbutton";
import { LabeledInputStr } from "./labeledinputs";
import { TaskbarContext } from "./sitecomps/toplevel";

export default function DrinkForm() {
  const { setRefreshBeers } = useContext(TaskbarContext);
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const [by, setBy] = useState("");

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/newbeer/", {
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
    await postData(formData);
    setRefreshBeers(true);
    setBeer("");
    setBrewery("");
    setBy("");
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={(e) => handleSubmit(e)}
      autoComplete="off"
    >
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
      <LabeledInputStr title="By" state={by} setState={setBy} required={true} />

      <WindowButton>
        <input id="button" type="submit" value="Submit" />
      </WindowButton>
    </form>
  );
}
