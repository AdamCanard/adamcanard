"use client";
import ErrorPopup from "@/app/desktop/errorpopup";
import { LabeledInputStr } from "@/app/desktop/labeledinputs";
import Window from "@/app/desktop/semanticcomps/window";
import { IError } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
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
          },
        );
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    let formData = new FormData(form);
    let data = await postData(formData);
    if (data.status === undefined) {
      //api returned user data
      formData = new FormData();
      formData.append("cookieName", "authToken");
      formData.append("cookieData", data.token);
      await createCookie(formData);
      formData = new FormData();
      formData.append("cookieName", "userId");
      formData.append("cookieData", data.record.id);
      data = await createCookie(formData);
      router.refresh();
      if (data.status === 400) {
        setError(data);
        setPopup(true);
      }
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
          },
        );
      } else {
        console.log(err);
      }
    }
  };

  const handlePassthrough = async () => {
    let formData = new FormData();
    formData.append("cookieName", "authToken");
    formData.append("cookieData", "letmein");
    await createCookie(formData);
    formData = new FormData();
    formData.append("cookieName", "userId");
    formData.append("cookieData", "Guest");
    await createCookie(formData);
    router.refresh();
  };

  const handleClick = () => {
    router.push("/auth/signup");
  };

  return (
    <>
      <ErrorPopup error={error} trigger={popup} setTrigger={setPopup}>
        <Window title="Login">
          <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
            <LabeledInputStr
              title="username"
              type="text"
              state={username}
              setState={setUsername}
              required={true}
            />
            <div id="button-i">
              <div className={"flex justify-between w-full pl-0.5"}>
                <input
                  id="button"
                  type="button"
                  value="SignUp"
                  onClick={handleClick}
                />
                <input
                  id="button"
                  type="button"
                  value="Join as Guest"
                  onClick={handlePassthrough}
                />
                <input id="button" type="submit" value="Submit" />
              </div>
            </div>
          </form>
        </Window>
      </ErrorPopup>
    </>
  );
}
