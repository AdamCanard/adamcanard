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
          "w-32 h-8 flex justify-center items-center  hover:cursor-pointer rounded-md"
        }
        onClick={handleClick}
      >
        {props.title}
      </button>
    </>
  );
}
