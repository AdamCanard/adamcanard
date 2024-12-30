"use client";
import { useEffect } from "react";
import TopLevel from "./components/sitecomps/toplevel";
import { useRouter } from "next/navigation";
import MobilePage from "./mobile/page";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1000px)");
    if (mql.matches) {
      router.push("/mobile");
    }
  });

  return (
    <>
      {true ? (
        <div id="mobile" className={"h-full flex-col"}>
          <MobilePage />
        </div>
      ) : (
        <div id="desktop">
          <div className="flex justify-center items-center w-full h-full">
            <TopLevel />
          </div>
        </div>
      )}
    </>
  );
}
