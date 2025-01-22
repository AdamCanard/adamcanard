"use client";
import { useContext } from "react";
import Image, { StaticImageData } from "next/image";
import { TaskbarContext } from "../taskbarcontext";

export default function Application(props: {
  title: string;
  src: StaticImageData;
  window: JSX.Element;
}) {
  const { openWindow } = useContext(TaskbarContext);
  return (
    <div onClick={() => openWindow(props.window)} className={"w-full h-full "}>
      <Image
        className={"hover:cursor-pointer"}
        src={props.src}
        alt={props.title + " desktop image"}
      />
    </div>
  );
}
