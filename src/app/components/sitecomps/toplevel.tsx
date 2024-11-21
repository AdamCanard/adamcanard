"use client";

import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BeerData, IError } from "../../types";
import ErrorPopup from "../errorpopup";
import { Taskbar } from "./taskbar";
import { useRouter } from "next/navigation";
import Desktop from "./desktop";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TaskbarContextType {
  username: string;
  admin: boolean;
  setAdmin: React.Dispatch<SetStateAction<boolean>>;
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

  const queryClient = new QueryClient();
  const loadUser = async () => {
    //if check for users authtoken
    const formData = new FormData();
    formData.append("cookie", "authToken");
    loginUser(formData);
  };

  const loginUser = async (formData: FormData) => {
    try {
      const response = await fetch("/api/getcookie/", {
        method: "POST",
        body: formData,
      });

      const cookie = await response.json();

      if (Object.keys(cookie).length === 0) {
        router.push("/auth/login");
      } else {
        let formData = new FormData();
        formData.append("cookie", "userId");
        let response = await fetch("/api/getcookie/", {
          method: "POST",
          body: formData,
        });
        const cookie = await response.json();

        formData = new FormData();
        formData.append("userId", cookie.data.value);
        response = await fetch("/api/getusername/", {
          method: "POST",
          body: formData,
        });
        const username = await response.json();
        setUsername(username.data.username);
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
          <QueryClientProvider client={queryClient}>
            {username != "" ? (
              <div
                unselectable="on"
                className="h-full w-full flex flex-col justify-center items-center"
              >
                <Desktop />
                <Taskbar />
              </div>
            ) : (
              <div className={"flex mt-[25%] h-[38px]"}>
                <Loading />
              </div>
            )}
          </QueryClientProvider>
        </ErrorPopup>
      </TaskbarContext.Provider>
    </>
  );
}

export function Loading() {
  return (
    <div id="boxshadow" className={"w-1/8 h-full"}>
      <h1 id="title">Logging you in...</h1>
    </div>
  );
}
