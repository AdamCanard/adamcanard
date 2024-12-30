"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./desktop/sitecomps/loading";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1000px)");
    if (mql.matches) {
      router.push("/mobile");
    } else {
      router.push("/desktop");
    }
  }, [router]);

  return (
    <>
      <Loading />
    </>
  );
}
