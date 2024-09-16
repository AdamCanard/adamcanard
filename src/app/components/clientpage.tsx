"use client";
import { useEffect, useState } from "react";
import ClientSheet from "./clientsheet";
import { useRouter } from "next/navigation";

export default function ClientPage() {
  const [cookie, setCookie] = useState();
  const router = useRouter();

  useEffect(() => {
    getCookie();
  });

  const getCookie = async () => {
    try {
      const response = await fetch("/api/getcookie/", { method: "GET" });
      const cookie = await response.json();
      if (cookie.data === undefined) {
        router.push("/auth/login");
      } else {
      }
      return cookie;
    } catch {
      //dont throw error
    }
  };

  return <ClientSheet />;
}
