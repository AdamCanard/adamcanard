"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { IError, IUser } from "../types";
import ErrorPopup from "./errorpopup";

interface TaskbarContextType {
  user: IUser;
  setUser: Dispatch<SetStateAction<IUser>>;
  admin: boolean;
  setAdmin: React.Dispatch<SetStateAction<boolean>>;
  windows: JSX.Element[];
  setWindows: React.Dispatch<SetStateAction<JSX.Element[]>>;
  openWindow: (window: JSX.Element) => void;
  isOpen: (name: string) => boolean;
  closeWindow: (name: string) => void;
  setError: React.Dispatch<SetStateAction<IError>>;
  setErrorTrigger: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType,
);

export default function TaskbarContextWrapper(props: {
  children?: React.ReactNode;
}) {
  const [windows, setWindows] = useState<JSX.Element[]>([]);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState<IUser>({} as IUser);
  const [error, setError] = useState<IError>({
    admin: { code: "123", message: "You are not Admin" },
  });
  const [errorTrigger, setErrorTrigger] = useState<boolean>(false);

  const loginUser = async () => {
    try {
      let formData = new FormData();
      formData.append("cookie", "userId");
      let response = await fetch("/api/getcookie/", {
        method: "POST",
        body: formData,
      });
      const cookie = await response.json();
      if (cookie.data.value === "Guest") {
        formData = new FormData();
        formData.append("userId", "413f8p29zx130fn");
        response = await fetch("/api/user/", {
          method: "POST",
          body: formData,
        });
        const username = await response.json();
        setUser(username);
        formData = new FormData();
        formData.append("Logs", username.Logs);
        response = await fetch("/api/user/" + "413f8p29zx130fn", {
          method: "PUT",
          body: formData,
        });
      } else {
        formData = new FormData();
        formData.append("userId", cookie.data.value);
        response = await fetch("/api/user/", {
          method: "POST",
          body: formData,
        });
        const username = await response.json();
        setUser(username);
        formData = new FormData();
        formData.append("Logs", username.Logs);
        response = await fetch("/api/user/" + username.id, {
          method: "PUT",
          body: formData,
        });
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

  const adminEnv = async () => {
    const email = process.env.NEXT_PUBLIC_EMAIL;
    const password = process.env.NEXT_PUBLIC_PASSWORD;

    if (email !== undefined && password !== undefined) {
      const formData = new FormData();
      formData.append("email", email as string);
      formData.append("password", password as string);
      try {
        const response = await fetch("/api/admin/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data.token) {
          setAdmin(true);
        }
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
    }
  };

  useEffect(() => {
    loginUser();
    adminEnv();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openWindow = (window: JSX.Element) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == window.key) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
        return;
      }
    }
    setWindows([...windows, window]);
  };
  const isOpen = (name: string) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == name) {
        return true;
      }
    }
    return false;
  };
  const closeWindow = (name: string) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == name) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };

  return (
    <>
      <TaskbarContext.Provider
        value={{
          user,
          admin,
          setAdmin,
          windows,
          setWindows,
          setErrorTrigger,
          setError,
          openWindow,
          isOpen,
          closeWindow,
          setUser,
        }}
      >
        {" "}
        <ErrorPopup
          error={error}
          trigger={errorTrigger}
          setTrigger={setErrorTrigger}
        >
          {props.children}
        </ErrorPopup>
      </TaskbarContext.Provider>
    </>
  );
}
