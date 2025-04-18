"use client";

import WideInput from "@/app/capstone/components/wideinput";
import { useContext, useState } from "react";
import { RenderContext } from "./renderer/renderer";

export default function Starting() {
  const renderer = useContext(RenderContext);
  const [eventType, setEventType] = useState<number>(0);
  return (
    <>
      <div className={"w-full p-5"}>
        <p className={"text-2xl"}>Event Details</p>

        <form
          className={"w-full flex flex-col gap-3"}
          onSubmit={(e) => {
            e.preventDefault();

            renderer.setWindowToRender(renderer.toRender["Counting"]);
          }}
        >
          <WideInput
            title={"Function ID:"}
            name="functionId"
            type={"text"}
            placeholder={"Function #"}
          />

          <WideInput
            title={"Client:"}
            name="clientName"
            type={"text"}
            placeholder={"Client Name"}
          />
          <div className={"flex flex-col items-start w-full"}>
            <h3 className={"font-bold text-text"}>Event type:</h3>
            <div className={"flex w-full"}>
              <button
                type="button"
                onClick={() => setEventType(0)}
                className={`flex justify-center items-center text-center py-5 rounded-l-md ${eventType === 0 ? "bg-secondary" : "bg-primary"} border-2 border-r-0 border-text w-1/3`}
              >
                <p>Cash</p>
              </button>
              <button
                type="button"
                onClick={() => setEventType(1)}
                className={`                              flex justify-center items-center text-center p-5 bg-primary w-1/3 border-2 border-text ${eventType === 1 ? "bg-secondary" : "bg-primary"}`}
              >
                <p>Subsidized</p>
              </button>
              <button
                type="button"
                onClick={() => setEventType(2)}
                className={`                              flex justify-center items-center text-center p-5 rounded-r-md bg-primary border-2 border-l-0 border-text w-1/3 ${eventType === 2 ? "bg-secondary" : "bg-primary"}`}
              >
                <p>Host</p>
              </button>
            </div>
          </div>

          {/* must ensure each input has been filled before allowing user to click continue */}
          <input
            className={
              "bg-primary border-2 border-text text-center p-5 w-full shadow-md rounded-md font-semibold"
            }
            type="submit"
            value={"Submit"}
          />
        </form>
      </div>
    </>
  );
}
