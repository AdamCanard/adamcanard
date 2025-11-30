"use client";
import { createContext, SetStateAction, useEffect, useState } from "react";

interface TaskbarContextType {
  admin: boolean;
  setAdmin: React.Dispatch<SetStateAction<boolean>>;
  windows: JSX.Element[];
  setWindows: React.Dispatch<SetStateAction<JSX.Element[]>>;
  openWindow: (window: JSX.Element) => void;
  isOpen: (name: string) => boolean;
  closeWindow: (name: string) => void;
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
    adminEnv();
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
          admin,
          setAdmin,
          windows,
          setWindows,
          openWindow,
          isOpen,
          closeWindow,
        }}
      >
        {props.children}
      </TaskbarContext.Provider>
    </>
  );
}
