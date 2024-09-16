"use client";
import LabeledInput from "@/app/components/labeledinput";
import Window from "@/app/components/window";
import WindowButton from "@/app/components/windowbutton";
import WindowInternal from "@/app/components/windowinternal";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/login/", {
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
          }
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData(form);
    let data = await postData(formData);
    formData = new FormData();
    formData.append("authToken", data.data.token);
    formData.append("userId", data.data.record.id);
    data = await createCookie(formData);
    if (data.ok) router.push("/");
  };

  const createCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/setcookie", {
        method: "POST",
        body: formData,
      });
      return response;
    } catch (err: unknown) {
      if (typeof err === "string") {
        console.log(err);
      } else if (err instanceof Error) {
        return new Response(
          JSON.stringify({ error: err.message || err.toString() }),
          {
            status: 500,
            headers: {},
          }
        );
      }
    }
  };

  return (
    <Window title="Login">
      <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
        <WindowInternal>
          <LabeledInput
            title="email"
            state={email}
            setState={setEmail}
            required={true}
          />
          <LabeledInput
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
  );
}
