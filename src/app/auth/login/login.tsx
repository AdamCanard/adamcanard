"use client";
import ErrorPopup from "@/app/components/errorpopup";
import { LabeledInputStr } from "@/app/components/labeledinputs";

import Window from "@/app/components/semanticcomps/window";
import WindowButton from "@/app/semanticcomps/windowbutton";
import WindowInternal from "@/app/components/semanticcomps/windowinternal";
import { IError } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<IError>();
  const [popup, setPopup] = useState<boolean>(false);

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

    if (data.data.status === undefined) {
      //api returned user data
      formData = new FormData();
      formData.append("authToken", data.data.token);
      formData.append("userId", data.data.record.id);
      data = await createCookie(formData);
      if (data.ok) router.push("/");
    } else if (data.data.status === 400) {
      setError(data.data);
      setPopup(true);
    }
  };

  const createCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/setcookie", {
        method: "POST",
        body: formData,
      });
      return response;
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

  const handleClick = () => {
    router.push("/auth/signup");
  };

  return (
    <>
      <ErrorPopup error={error} trigger={popup} setTrigger={setPopup}>
        <Window title="Login">
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
        <div
          onClick={handleClick}
          className="hover:cursor-pointer text-xs w-full justify-center flex pt-1 text-[#1084d0]"
        >
          Try signup
        </div>
      </ErrorPopup>
    </>
  );
}
