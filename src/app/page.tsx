"use client";
import { useEffect, useState } from "react";
import TopLevel from "./components/sitecomps/toplevel";
import MobileTop from "./mobile/mobiletop";
export default function Page() {
  const [flag, setFlag] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1000px)");
    setFlag(mql.matches);
  }, []);

  return (
    <>
      {flag ? (
        <div id="mobile" className={"h-full flex-col"}>
          <MobileTop />
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
