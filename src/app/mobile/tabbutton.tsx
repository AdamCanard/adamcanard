import { Dispatch, SetStateAction, useContext } from "react";
import { MobileContext } from "./page";

export default function TabButton(props: {
  title: string;
  set: Dispatch<SetStateAction<string>>;
}) {
  const { tab } = useContext(MobileContext);
  return (
    <div
      id={tab === props.title ? "MTabButtonPressed" : "MTabButton"}
      className={"w-full h-full text-center leading-8 hover:cursor-pointer"}
      onClick={() => props.set(props.title)}
    >
      {props.title}
    </div>
  );
}
