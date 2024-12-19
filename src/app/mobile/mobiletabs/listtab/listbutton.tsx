import { Dispatch, SetStateAction, useContext } from "react";
import { MobileContext } from "../../mobiletop";

export default function ListButton(props: {
  title: string;
  set: Dispatch<SetStateAction<string>>;
}) {
  const { list } = useContext(MobileContext);
  return (
    <>
      <div
        id={list === props.title ? "MTabButtonPressed" : "MTabButton"}
        className={"w-full h-full text-center leading-8 hover:cursor-pointer"}
        onClick={() => props.set(props.title)}
      >
        {props.title}
      </div>
    </>
  );
}
