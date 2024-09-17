"use client";
import Image from "next/image";
import Mob from "../../../public/Windows/Mob.png";
import { createContext, useState } from "react";

interface TaskbarContextType {
  username: string;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType
);

export default function TaskbarWrapper(props: {
  children: React.ReactElement;
}) {
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
      <TaskbarContext.Provider value={{ username }}>
        {props.children}

        <Taskbar />
      </TaskbarContext.Provider>
    </>
  );
}

export function Taskbar() {
  return (
    <div className="absolute bottom-0 left-0 w-full">
      <div className="flex flex-row items-end">
        <div id="border-nb" className=" z-10 w-16 h-16 ">
          <Image src={Mob} width={64} height={64} alt="Mob charater" />
        </div>
        <div id="border-nb" className=" z-0 w-full h-8 ">
          <div className=" h-full "></div>
        </div>
      </div>
    </div>
  );
}
