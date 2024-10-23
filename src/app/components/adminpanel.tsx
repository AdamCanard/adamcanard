"use client";

import { LabeledInputStr } from "@/app/components/labeledinputs";
import WindowButton from "@/app/components/semanticcomps/windowbutton";
import WindowInternal from "@/app/components/semanticcomps/windowinternal";
import { useContext, useState } from "react";
import DraggableWindow from "./semanticcomps/draggablewindow";
import { TaskbarContext } from "./sitecomps/toplevel";

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
      if (data.data.admin) {
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
      if (windows[i].key == "AdminPanel") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  return (
    <>
      <DraggableWindow
        title="Admin"
        width="72"
        heigth="2/3"
        windowKey="AdminPanel"
        close={handleClose}
      >
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
      </DraggableWindow>
    </>
  );
}
