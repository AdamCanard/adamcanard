"use client";
import InputBox from "./inputbox";
import Window from "../semantics/window";
import WindowButton from "../semantics/windowbutton";
import WindowInternal from "../semantics/windowinternal";

export default function Form(props: { Title: string; Fields: string[] }) {
  //add new Beer from formData
  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/newbeer/", {
        method: "POST",
        body: formData,
      });
      console.log(await response.json());
    } catch (err: unknown) {
      return new Response(
        JSON.stringify({ error: err.message || err.toString() }),
        {
          status: 500,
          headers: {},
        }
      );
    }
  };

  //On submit grab data from form, add the appropriate Drank value based on Form Title
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    if (props.Title == "Drank") {
      formData.append("Drank", true);
    } else {
      formData.append("Drank", false);
    }
    postData(formData);
    // reset();
  };

  return (
    <Window title={"New " + props.Title}>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <WindowInternal>
          {props.Fields.map((title: string, index: number) => {
            // For every string in fields, generate an InputBox for the value
            return <InputBox title={title} key={index} />;
          })}
        </WindowInternal>
        <WindowButton>
          <input id="button" type="submit" />
        </WindowButton>
      </form>
    </Window>
  );
}
