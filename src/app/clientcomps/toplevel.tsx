"use client";

import { createContext, useState } from "react";
import ClientPage from "./clientpage";
import Body from "../components/body";
import { IError } from "../types";
import ErrorPopup from "./errorpopup";
import { Taskbar } from "./taskbar";

interface TaskbarContextType {
  username: string;
  admin: boolean;
  adminCheck: () => Promise<void>;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType
);

export default function TopLevel() {
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState<IError>();
  const [popup, setPopup] = useState<boolean>(false);

  const loadUser = async () => {
    let formData = new FormData();
    formData.append("cookie", "userId");
    const cookie = await getCookie(formData);
    formData = new FormData();
    formData.append("recordId", cookie.data.value);
    const username = await getUsername(formData);
    setUsername(username.data.username);
  };

  const adminCheck = async () => {
    const auth = await authAdmin();

    if (auth.admin) {
      setAdmin(!admin);
    } else {
      setError({ admin: { code: "123", message: "You are not Admin" } });
      setPopup(true);
    }
  };

  const authAdmin = async () => {
    try {
      const response = await fetch("/api/admin/", {
        method: "GET",
      });
      const username = await response.json();

      return username;
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

  const getCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getcookie/", {
        method: "POST",
        body: formData,
      });
      const cookie = await response.json();
      return cookie;
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
  const getUsername = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getusername/", {
        method: "POST",
        body: formData,
      });
      const username = await response.json();
      return username;
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

  loadUser();

  return (
    <>
      <TaskbarContext.Provider value={{ username, admin, adminCheck }}>
        <ErrorPopup error={error} trigger={popup} setTrigger={setPopup}>
          {!admin ? (
            <>
              <ClientPage />
            </>
          ) : (
            <>
              <Body />
            </>
          )}

          <Taskbar />
        </ErrorPopup>
      </TaskbarContext.Provider>
    </>
  );
}
