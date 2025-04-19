"use client";
import { ErrorContext } from "@/app/desktop/errorprovider";
import { LabeledInputStr } from "@/app/desktop/labeledinputs";
import Window from "@/app/desktop/semanticcomps/window";
import { IError } from "@/app/types";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const { raiseError } = useContext(ErrorContext);
  const postData = async (formData: FormData) => {
    try {
      const response = await fetch("/api/signup/", {
        method: "POST",
        body: formData,
      });
      if (response.status === 201) {
        router.push("/auth/login");
      } else {
        const data = await response.json();
        const newError: IError = {
          status: response.status,
          message: data.message,
        };
        raiseError(newError);
      }
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
    await postData(formData);
  };

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <>
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
    </>
  );
}
