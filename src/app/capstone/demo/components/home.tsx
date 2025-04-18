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
        "flex flex-col min-h-svh max-h-svh w-screen items-center bg-background"
      }
    >
      <div
        className={"flex flex-col justify-around items-center h-full w-[90%]"}
      >
        <div
          className={
            "flex flex-col justify-center items-center text-center gap-5"
          }
        >
          <Image src={hpLogo} alt={"Heritage Park logo"} />
          <h1 className={"text-2xl"}>Hello Guest!</h1>
        </div>

        <div className={"flex flex-col gap-5 w-full"}>
          <BigButton runFunction={() => {}} text="Pick Location for Count" />

          <BigButton runFunction={() => {}} text="Non-Alcoholic Count" />

          <BigButton runFunction={() => {}} text="Transfer" />
        </div>
        <div className={"flex flex-row gap-2"}>
          {" "}
          <button
            name="desktop-btn"
            className={
              "w-full p-2 text-accent text-center font-semibold border-2 border-accent rounded-md"
            }
            onClick={() =>
              renderer.setWindowToRender(renderer.toRender["Desktop"])
            }
          >
            Desktop
          </button>
        </div>
      </div>
    </div>
  );
}
