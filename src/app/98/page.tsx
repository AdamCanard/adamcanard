"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./desktop/sitecomps/loading";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("98/desktop");
  }, [router]);

  return (
    <div className={"w-full h-full"}>
      <Loading />
    </div>
  );
}
