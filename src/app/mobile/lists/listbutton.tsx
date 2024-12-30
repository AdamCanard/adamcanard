"use client";
import { usePathname, useRouter } from "next/navigation";

export default function ListButton(props: { title: string; nav: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      <div
        id={
          pathname.indexOf(props.nav) !== -1
            ? "MTabButtonPressed"
            : "MTabButton"
        }
        className={"w-full h-full text-center leading-8 hover:cursor-pointer"}
        onClick={() => router.push(props.nav)}
      >
        {props.title}
      </div>
    </>
  );
}
