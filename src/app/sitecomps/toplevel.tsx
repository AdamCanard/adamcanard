"use client";

import { createContext, SetStateAction, useState } from "react";
import ClientPage from "../clientcomps/clientpage";
import { IError } from "../types";
import ErrorPopup from "../clientcomps/errorpopup";
import { Taskbar } from "./taskbar";
import AdminPage from "../admincomps/adminpage";
import { useRouter } from "next/navigation";

interface TaskbarContextType {
  username: string;
  admin: boolean;
  adminCheck: () => Promise<void>;
  id: string;
  setId: React.Dispatch<SetStateAction<string>>;
  window: string;
  setWindow: React.Dispatch<SetStateAction<string>>;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType
);

export default function TopLevel() {
  const [id, setId] = useState<string>("");
  const [window, setWindow] = useState<string>("");
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const error: IError = {
    admin: { code: "123", message: "You are not Admin" },
  };
  const [popup, setPopup] = useState<boolean>(false);

  const router = useRouter();

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
      router.push("auth/admin");
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
      <TaskbarContext.Provider
        value={{ username, admin, adminCheck, id, setId, window, setWindow }}
      >
        <ErrorPopup error={error} trigger={popup} setTrigger={setPopup}>
          <div className="h-full w-full flex flex-col justify-center items-center">
            {!admin ? (
              <ClientPage />
            ) : (
              <>
                <AdminPage />
              </>
            )}

            <Taskbar />
          </div>
        </ErrorPopup>
      </TaskbarContext.Provider>
    </>
  );
}
