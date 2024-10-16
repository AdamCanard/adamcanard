import { Dispatch, SetStateAction } from "react";

export default function TabButton(props: {
  title: string;
  set: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div
      id="MTabButton"
      className={"w-24 h-full text-center leading-8 hover:cursor-pointer"}
      onClick={() => props.set(props.title)}
    >
      {props.title}
    </div>
  );
}
