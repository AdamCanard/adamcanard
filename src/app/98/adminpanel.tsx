"use client";

import { useContext, useState } from "react";
import DesktopWindow from "./sitecomps/desktopwindow";
import { TaskbarContext } from "./taskbarcontext";
import { LabeledInputStr } from "./labeledinputs";
import WindowInternal from "./semanticcomps/windowinternal";
import WindowButton from "./semanticcomps/windowbutton";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdmin, closeWindow } = useContext(TaskbarContext);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = await postData(formData);
    setEmail("");
    setPassword("");
    try {
      if (data.token !== "") {
        setAdmin(true);
        closeWindow("Admin");
      }
    } catch (error) {}
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
      <DesktopWindow title="Admin" width="18rem" height="">
        <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
          <WindowInternal>
            <LabeledInputStr
              title="email"
              type="email"
              state={email}
              setState={setEmail}
              required={true}
            />
            <LabeledInputStr
              title="password"
              type="password"
              state={password}
              setState={setPassword}
              required={false}
            />
          </WindowInternal>
          <WindowButton>
            <input id="button" type="submit" value="Submit" />
          </WindowButton>
        </form>
      </DesktopWindow>
    </>
  );
}
