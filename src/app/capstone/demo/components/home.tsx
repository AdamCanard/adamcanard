"use client";
import BigButton from "../../components/bigbutton";
import hpLogo from "../../../../../public/heritage-park.svg";
import Image from "next/image";
import { useContext } from "react";
import { RenderContext } from "../../renderer/renderer";
export default function Home() {
  const renderer = useContext(RenderContext);
  return (
    <div
      className={
        "flex flex-col min-h-svh max-h-svh w-screen items-center bg-background justify-center"
      }
    >
      <div
        className={
          "flex flex-col justify-center items-center text-center gap-5"
        }
      >
        <Image src={hpLogo} alt={"Heritage Park logo"} />
        <p className={"text-2xl"}>Hello Guest!</p>
      </div>

      <div className={"flex flex-col gap-5 w-full"}>
        <BigButton
          runFunction={() =>
            renderer.setWindowToRender(renderer.toRender["Location"])
          }
          text="Bartender"
        />
        <BigButton
          runFunction={() =>
            renderer.setWindowToRender(renderer.toRender["Desktop"])
          }
          text="Admin Portal"
        />
      </div>
    </div>
  );
}
