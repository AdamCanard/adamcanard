"use client";
import { useRouter } from "next/navigation";

export default function ListButton(props: { title: string }) {
  const router = useRouter();
  return (
    <>
      <div
        id={"MTabButton"}
        className={"w-full h-full text-center leading-8 hover:cursor-pointer"}
        onClick={() => router.push("/mobile/lists/" + props.title)}
      >
        {props.title}
      </div>
    </>
  );
}
