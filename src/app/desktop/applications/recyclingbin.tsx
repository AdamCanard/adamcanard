"use client";
import { useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function RecyclingBin() {
  const [suggestion, setSuggestion] = useState("");
  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/application/" + "Recycling", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      return data;
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

    await postData(formData);
    setSuggestion("");
  };
  return (
    <DesktopWindow title="Recycling Bin" width="20rem" height="">
      <form className={"w-full h-full"} onSubmit={(e) => handleSubmit(e)}>
        <label id="border" className="flex justify-between w-full text-sm">
          Enter Suggestion:
          <textarea
            autoComplete="off"
            required
            name={"Suggestion"}
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className={"h-12"}
          />
        </label>
        <div id="button-i">
          <input id="button" type="submit" value="Submit" />
        </div>
      </form>
    </DesktopWindow>
  );
}
