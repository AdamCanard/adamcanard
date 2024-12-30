"use client";
import { useEffect, useState } from "react";
import TopLevel from "./components/sitecomps/toplevel";
import { useRouter } from "next/navigation";
import MobilePage from "./mobile/page";
export default function Page() {
  const [flag, setFlag] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1000px)");
    if (mql.matches) {
      setFlag(mql.matches);
      router.push("/mobile");
    }
  }, [router]);

  return (
    <>
      {flag ? (
        <MobilePage />
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
