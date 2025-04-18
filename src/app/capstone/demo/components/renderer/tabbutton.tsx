"use client";
import { JSX, useContext } from "react";
import { RenderContext } from "./renderer";

export function TabButton(props: { title: string; set: JSX.Element }) {
  const { windowToRender, setWindowToRender } = useContext(RenderContext);
  const handleClick = () => {
    setWindowToRender(props.set);
  };
  return (
    <>
      <button
        name={props.title}
        id={
          props.title === windowToRender.key
            ? "RenderButtonPressed"
            : "RenderButton"
        }
        className={
          "w-full h-12 flex justify-center items-center leading-8 hover:cursor-pointer rounded-md"
        }
        onClick={handleClick}
      >
        {props.title}
      </button>
    </>
  );
}
