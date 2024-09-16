"use client";
import ErrorPopup from "@/app/clientcomps/errorpopup";
import LabeledInput from "@/app/clientcomps/labeledinput";
import Window from "@/app/semantics/window";
import WindowButton from "@/app/semantics/windowbutton";
import WindowInternal from "@/app/semantics/windowinternal";
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
