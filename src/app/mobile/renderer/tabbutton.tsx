"use client";
import { useContext } from "react";
import { RenderContext } from "./renderer";

export function TabButton(props: { title: string; set: JSX.Element }) {
  const { window, setWindow } = useContext(RenderContext);
  return (
    <>
      <div
        id={props.title === window.key ? "MTabButtonPressed" : "MTabButton"}
        className={"w-full h-full text-center leading-8 hover:cursor-pointer"}
        onClick={() => setWindow(props.set)}
      >
        {props.title}
      </div>
    </>
  );
}
