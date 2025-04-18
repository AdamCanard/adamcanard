import { FormEvent, useContext, useState } from "react";
import CountingList from "./countingcomps/countinglist";
import { RenderContext } from "./renderer/renderer";

export default function Counting() {
  const [submit, setSubmit] = useState<boolean>(false);
  const renderer = useContext(RenderContext);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmit(true);
  };

  const submitCount = async () => {
    renderer.setWindowToRender(renderer.toRender["Active"]);
  };
  return (
    <div className={"p-5"}>
      <p className={"text-2xl"}>Count</p>
      <div className={"w-full flex flex-col gap-3"}></div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className={"flex flex-col gap-1 w-full h-full"}
      >
        <CountingList locationId={"1"} />{" "}
        <div className={"flex gap-1"}>
          <button
            name="save-drinkform"
            className={"rounded-md text-text border-text border-2 px-3 py-1"}
          >
            Save
          </button>
          {submit && (
            <button
              name="submit-drinkform"
              type="button"
              onClick={() => submitCount()}
              className={"rounded-md bg-text text-primary px-3 py-1 w-full"}
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
