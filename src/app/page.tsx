"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "./98/desktop/sitecomps/loading";
export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/98");
  }, [router]);

  return (
    <body className={"w-full h-full"}>
      <Loading />
    </body>
  );
}
