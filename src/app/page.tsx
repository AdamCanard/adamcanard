"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const router = useRouter();
  const handleRoute = (route: string) => {
    router.push(route);
  };
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1300px)");
    if (mql.matches) {
      router.push("/mobile");
    }
  }, [router]);
  return (
    <div className={"w-full h-full  justify-center items-center flex"}>
      <div id="boxshadow" className={"w-1/2 h-1/2 justify-center items-center"}>
        <h1 id="title" className={"font-bold"}>
          {"Welcome to Adam's Portfolio"}
        </h1>
        <button id="button" onClick={() => handleRoute("xp")}>
          Windows XP
        </button>
        <button id="button" onClick={() => handleRoute("98")}>
          Windows 98
        </button>
      </div>
    </div>
  );
}
