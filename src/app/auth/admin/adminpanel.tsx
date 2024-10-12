"use client";

import { LabeledInputStr } from "@/app/components/labeledinputs";
import Window from "@/app/components/semanticcomps/window";
import WindowButton from "@/app/components/semanticcomps/windowbutton";

import WindowInternal from "@/app/components/semanticcomps/windowinternal";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = await postData(formData);
    console.log(data);
    try {
      if (data.data.admin) {
        console.log(data.data);
        const cookieData = new FormData();
        cookieData.append("cookieName", "adminCookie");
        cookieData.append("cookieData", data.data.admin.id);
        setCookie(cookieData);
        router.push("/");
      }
    } catch (error) {}
  };

  const setCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/setcookie/", {
        method: "POST",
        body: formData,
      });

      return response.json();
    } catch (err: unknown) {
      if (typeof err === "string") {
        console.log(err);
      } else if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      }
    }
  };

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/admin/", {
        method: "POST",
        body: formData,
      });

      return response.json();
    } catch (err: unknown) {
      if (typeof err === "string") {
        console.log(err);
      } else if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          },
        );
      }
    }
  };

  return (
    <>
      <Window title="Admin">
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <WindowInternal>
            <LabeledInputStr
              title="email"
              state={email}
              setState={setEmail}
              required={true}
            />
            <LabeledInputStr
              title="password"
              state={password}
              setState={setPassword}
              required={false}
            />
          </WindowInternal>
          <WindowButton>
            <input id="button" type="submit" />
          </WindowButton>
        </form>
      </Window>
    </>
  );
}
