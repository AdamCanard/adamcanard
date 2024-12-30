import { useState } from "react";
import {
  LabeledInputNum,
  LabeledInputStr,
} from "../../components/labeledinputs";

export default function SecretForms() {
  return (
    <>
      <div className={"flex flex-col"}>
        <div id="boxshadow">
          <h1 id="title">Drink</h1>
          <DrinkForm />
        </div>
        <div id="boxshadow">
          <h1 id="title">Drank</h1>
          <DrankForm />
        </div>
      </div>
    </>
  );
}
function DrinkForm() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const [by, setBy] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await postData(formData, "/api/drink/");
    setBeer("");
    setBrewery("");
    setBy("");
  };
  return (
    <>
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
        <LabeledInputStr
          title="By"
          type="text"
          state={by}
          setState={setBy}
          required={true}
        />
        <div id="button-i">
          <input id="button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
function DrankForm() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const [rating, setRating] = useState(0);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    await postData(formData, "/api/drank/");
    setBeer("");
    setBrewery("");
    setRating(0);
  };
  return (
    <>
      {" "}
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
        <LabeledInputNum
          title="Rating"
          state={rating}
          setState={setRating}
          required={true}
        />

        <div id="button-i">
          <input id="button" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}

const postData = async (formData: FormData, api: string) => {
  try {
    const response = await fetch(api, {
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
