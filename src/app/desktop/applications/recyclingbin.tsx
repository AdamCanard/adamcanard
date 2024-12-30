"use client";
import { useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function RecyclingBin() {
  const [suggestion, setSuggestion] = useState("");
  return (
    <DesktopWindow title="Recycling Bin" width="20rem" height="">
      <form className={"w-full h-full"}>
        <label id="border" className="flex justify-between w-full text-sm">
          Enter Suggestion:
          <textarea
            autoComplete="off"
            required
            name={"Suggestions"}
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
