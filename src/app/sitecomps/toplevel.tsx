"use client";

import { createContext, SetStateAction, useEffect, useState } from "react";
import ClientPage from "../clientcomps/clientpage";
import { BeerData, IError } from "../types";
import ErrorPopup from "../clientcomps/errorpopup";
import { Taskbar } from "./taskbar";
import AdminPage from "../admincomps/adminpage";
import { useRouter } from "next/navigation";

interface TaskbarContextType {
  username: string;
  admin: boolean;
  adminCheck: () => Promise<void>;
  ids: string[];
  setIds: React.Dispatch<SetStateAction<string[]>>;
  windows: JSX.Element[];
  setWindows: React.Dispatch<SetStateAction<JSX.Element[]>>;
  beers: BeerData[];
  setBeers: React.Dispatch<SetStateAction<BeerData[]>>;
  listElements: BeerData[];
  setError: React.Dispatch<SetStateAction<IError>>;
  setErrorTrigger: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType
);

export default function TopLevel() {
  const [ids, setIds] = useState<string[]>([]);
  const [windows, setWindows] = useState<JSX.Element[]>([]);
  const [admin, setAdmin] = useState(true);
  const [username, setUsername] = useState("");
  const [beers, setBeers] = useState<BeerData[]>([]);
  const [error, setError] = useState<IError>({
    admin: { code: "123", message: "You are not Admin" },
  });
  const [errorTrigger, setErrorTrigger] = useState<boolean>(false);
  const [listElements, setListElements] = useState<BeerData[]>([]);

  const router = useRouter();

  const loadUser = async () => {
    //if check for users authtoken
    let formData = new FormData();
    formData.append("cookie", "authToken");
    getAuthCookie(formData);

    //if user has an authtoken, get their user id
    formData = new FormData();
    formData.append("cookie", "userId");
    const cookie = await getCookie(formData);

    //get username from userId
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

  const getAuthCookie = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getcookie/", {
        method: "POST",
        body: formData,
      });
      const cookie = await response.json();
      if (cookie.data === undefined) {
        router.push("/auth/login");
      } else {
      }
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
  const getListElements = async () => {
    try {
      const response = await fetch("/api/getbeer/", { method: "GET" });
      const beerListResponse = await response.json();
      setListElements(beerListResponse.items);
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

  useEffect(() => {
    loadUser();
    getListElements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TaskbarContext.Provider
        value={{
          username,
          admin,
          adminCheck,
          ids,
          setIds,
          windows,
          setWindows,
          beers,
          setBeers,
          listElements,
          setErrorTrigger,
          setError,
        }}
      >
        <ErrorPopup
          error={error}
          trigger={errorTrigger}
          setTrigger={setErrorTrigger}
        >
          <div
            unselectable="on"
            className="h-full w-full flex flex-col justify-center items-center"
          >
            {!admin ? <ClientPage /> : <AdminPage />}
            <Taskbar />
          </div>
        </ErrorPopup>
      </TaskbarContext.Provider>
    </>
  );
}
