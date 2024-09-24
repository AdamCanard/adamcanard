import { useState } from "react";
import WindowInternal from "../semantics/windowinternal";
import WindowButton from "../semantics/windowbutton";
import { LabeledInputNum, LabeledInputStr } from "../clientcomps/labeledinputs";
import DraggableWindow from "../semantics/draggablewindow";

export default function DrankForm() {
  const [beer, setBeer] = useState("");
  const [brewery, setBrewery] = useState("");
  const [rating, setRating] = useState(0);

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
    formData.append("Drank", true);
    postData(formData);
    setBeer("");
    setBrewery("");
    setRating(0);
  };

  return (
    <DraggableWindow title={"New Drank"} width={"1/3"} heigth={"1/3"}>
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
          <LabeledInputNum
            title="Rating"
            state={rating}
            setState={setRating}
            required={true}
          />
        </WindowInternal>
        <WindowButton>
          <input id="button" type="submit" />
        </WindowButton>
      </form>
    </DraggableWindow>
  );
}
