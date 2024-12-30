"use client";
import TopLevel from "./components/sitecomps/toplevel";
import { useRouter } from "next/navigation";
export default function Page() {
  const router = useRouter();

  const mql = window.matchMedia("(max-width: 1000px)");
  if (mql.matches) {
    router.push("/mobile");
  } else {
  }

  return (
    <>
      <div id="desktop">
        <div className="flex justify-center items-center w-full h-full">
          <TopLevel />
        </div>
      </div>
    </>
  );
}
