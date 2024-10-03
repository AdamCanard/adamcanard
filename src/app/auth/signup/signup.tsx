"use client";
import ErrorPopup from "@/app/components/errorpopup";
import { LabeledInputStr } from "@/app/components/labeledinputs";
import Window from "@/app/components/semanticcomps/window";
import WindowButton from "@/app/semanticcomps/windowbutton";
import WindowInternal from "@/app/components/semanticcomps/windowinternal";
import { IError } from "@/app/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          }
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
          Try login
        </div>
      </ErrorPopup>
    </>
  );
}
