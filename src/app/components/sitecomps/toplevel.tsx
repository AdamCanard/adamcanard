"use client";

import { createContext, SetStateAction, useEffect, useState } from "react";
import ClientPage from "../clientpage";
import { BeerData, IError } from "../../types";
import ErrorPopup from "../errorpopup";
import { Taskbar } from "./taskbar";
import AdminPage from "../adminpage";
import { useRouter } from "next/navigation";

interface TaskbarContextType {
  username: string;
  admin: boolean;
  setAdmin: React.Dispatch<SetStateAction<boolean>>;
  ids: string[];
  setIds: React.Dispatch<SetStateAction<string[]>>;
  windows: JSX.Element[];
  setWindows: React.Dispatch<SetStateAction<JSX.Element[]>>;
  beers: BeerData[];
  setBeers: React.Dispatch<SetStateAction<BeerData[]>>;
  listElements: BeerData[];
  setError: React.Dispatch<SetStateAction<IError>>;
  setErrorTrigger: React.Dispatch<SetStateAction<boolean>>;
  setRefreshBeers: React.Dispatch<SetStateAction<boolean>>;
}

//cast empty object to contexttype
export const TaskbarContext = createContext<TaskbarContextType>(
  {} as TaskbarContextType,
);

export default function TopLevel() {
  const [ids, setIds] = useState<string[]>([]);
  const [windows, setWindows] = useState<JSX.Element[]>([]);
  const [admin, setAdmin] = useState(false);
  const [username, setUsername] = useState("");
  const [beers, setBeers] = useState<BeerData[]>([]);
  const [error, setError] = useState<IError>({
    admin: { code: "123", message: "You are not Admin" },
  });
  const [errorTrigger, setErrorTrigger] = useState<boolean>(false);
  const [listElements, setListElements] = useState<BeerData[]>([]);
  const [refreshBeers, setRefreshBeers] = useState<boolean>(true);

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
          },
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
          },
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
          },
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
      if (sameLists(listElements, beerListResponse.items)) {
        await getListElements();
      } else {
        setListElements(beerListResponse.items);
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

  const sameLists = (list1: BeerData[], list2: BeerData[]) => {
    if (list1.length == list2.length) {
      for (let i = 0; i < list1.length; i++) {
        if (list1[i].Drank === list2[i].Drank) {
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  };

  useEffect(() => {
    loadUser();
    if (refreshBeers) {
      getListElements();
      setRefreshBeers(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshBeers]);

  return (
    <>
      <TaskbarContext.Provider
        value={{
          username,
          admin,
          setAdmin,
          ids,
          setIds,
          windows,
          setWindows,
          beers,
          setBeers,
          listElements,
          setErrorTrigger,
          setError,

          setRefreshBeers,
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
