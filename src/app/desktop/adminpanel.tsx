"use client";

import { LabeledInputStr } from "@/app/desktop/labeledinputs";
import WindowButton from "@/app/desktop/semanticcomps/windowbutton";
import WindowInternal from "@/app/desktop/semanticcomps/windowinternal";
import { useContext, useState } from "react";
import DesktopWindow from "./sitecomps/desktopwindow";
import { TaskbarContext } from "./taskbarcontext";

export default function AdminPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAdmin, windows, setWindows } = useContext(TaskbarContext);

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
        handleClose();
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
  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "Admin") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
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
