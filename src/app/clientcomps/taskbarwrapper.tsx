"use client";
import Image from "next/image";
import Mob from "../../../public/Windows/Mob.png";
import { createContext, SetStateAction, useContext, useState } from "react";
import ClientPage from "./clientpage";
import Body from "../components/body";
import { useRouter } from "next/navigation";

interface TaskbarContextType {
  username: string;
  admin: boolean;
  setAdmin: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType
);

export default function TopLevel() {
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");

  const loadUser = async () => {
    let formData = new FormData();
    formData.append("cookie", "userId");
    const cookie = await getCookie(formData);
    formData = new FormData();
    formData.append("recordId", cookie.data.value);
    const username = await getUsername(formData);

    setUsername(username.data.username);
  };

  const getCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getcookie/", {
        method: "POST",
        body: formData,
      });
      const cookie = await response.json();
      return cookie;
    } catch {
      //dont throw error
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
    } catch {
      //dont throw error
    }
  };

  loadUser();

  return (
    <>
      <TaskbarContext.Provider value={{ username, admin, setAdmin }}>
        {admin ? (
          <>
            <ClientPage />
          </>
        ) : (
          <>
            <Body />
          </>
        )}

        <Taskbar />
      </TaskbarContext.Provider>
    </>
  );
}

export function Taskbar() {
  const router = useRouter();
  const taskbarContext = useContext(TaskbarContext);
  const RouteSuggestion = () => {
    router.push("admin/suggestions");
  };
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end h-8">
        <div id="border-nb" className=" z-10 w-16 h-16 ">
          <Image src={Mob} width={64} height={64} alt="Mob charater" />
        </div>
        <div id="border-b" className=" z-0 w-full h-8 ">
          <div className="flex h-full justify-end items-center gap-2">
            {!taskbarContext.admin && (
              <div onClick={RouteSuggestion}>Suggestion Manager</div>
            )}
            <div id="username-content">
              <div>apple</div>
            </div>
            <div id="username">{taskbarContext.username}</div>
            <div
              id="button-nm"
              className="leading-8 hover:cursor-pointer"
              onClick={() => taskbarContext.setAdmin(!taskbarContext.admin)}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
