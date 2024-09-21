"use client";
import { useEffect } from "react";
import ClientSheet from "./clientsheet";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const router = useRouter();

  useEffect(() => {
    const formData = new FormData();
    formData.append("cookie", "authToken");
    getCookie(formData);
  });

  const getCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getcookie/", {
        method: "POST",
        body: formData,
      });
      const cookie = await response.json();
      if (cookie.data === undefined) {
        router.push("/auth/login");
      } else {
      }
      return cookie;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
      } else {
        console.log(err);
      }
    }
  };

  return <ClientSheet />;
}
