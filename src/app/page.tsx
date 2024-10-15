"use client";
import TopLevel from "./components/sitecomps/toplevel";
import MobileTop from "./mobile/mobileTop";

export default function Page() {
  return (
    <>
      <div id="mobile" className={"h-full flex-col"}>
        <MobileTop />
      </div>
      <div id="desktop">
        <div className="flex justify-center items-center w-full h-full">
          <TopLevel />
        </div>
      </div>
    </>
  );
}
