"use client";
import ErrorPopup from "@/app/desktop/errorpopup";
import { LabeledInputStr } from "@/app/desktop/labeledinputs";
import Window from "@/app/desktop/semanticcomps/window";
import { IError } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<IError>();
  const [popup, setPopup] = useState<boolean>(false);

  const router = useRouter();

  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/signup/", {
        method: "POST",
        body: formData,
      });

      return response.json();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = await postData(formData);

    if (data.data.status === undefined) {
      //api returned new user data
      router.push("/auth/login");
    } else if (data.data.status === 400) {
      setError(data.data.response.data);
      setPopup(true);
    }
  };

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <>
      <ErrorPopup error={error} trigger={popup} setTrigger={setPopup}>
        <Window title="SignUp">
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
                  value="Login"
                  onClick={handleClick}
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
