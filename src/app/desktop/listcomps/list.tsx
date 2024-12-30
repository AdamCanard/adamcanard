"use client";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

import Form from "./form";
import ListWindow from "./listWindow";
import ListToolBar from "./listtoolbar";
import { TaskbarContext } from "../taskbarcontext";

export default function List(props: {
  title: string;
  api: string;
  adminNeeded: boolean;
  submit: (arg0: never[]) => void;
  actionNeeded: boolean;
}) {
  const { admin, windows, setWindows } = useContext(TaskbarContext);
  const [listElements, setListElements] = useState([]);
  const [formElements, setFormElements] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const openElementWindow = (window: JSX.Element) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == window.key) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
        return;
      }
    }
    setWindows([...windows, window]);
  };

  const getData = async (id: string) => {
    if (id) {
      try {
        const response = await fetch(props.api + id, {
          method: "GET",
        });
        const data: object = await response.json();
        openElementWindow(
          <ListWindow
            api={props.api}
            data={data}
            id={id}
            key={Object.values(data)[0]}
          />,
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          return new Response(
            JSON.stringify({ error: err.message || err.toString() }),
            { status: 500, headers: {} },
          );
        } else {
          console.log(err);
        }
      }
    }
  };

  const isOpen = (name: string) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == name) {
        return true;
      }
    }
    return false;
  };

  const subStringer = (element: object) => {
    const list = Object.values(element);
    let subStringed = "";
    for (let i = 0; i < list.length - 1; i++) {
      subStringed += list[i] + " ";
    }
    return subStringed.indexOf(search) !== -1;
  };

  const getListElements = useCallback(async () => {
    try {
      const response = await fetch(props.api, { method: "GET" });
      const listResponse = await response.json();

      setListElements(listResponse);
      setFormElements(Object.keys(listResponse[0]));
      return listResponse;
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
  }, [props.api]);

  const { isPending, isError, error, isSuccess } = useQuery({
    queryKey: [props.title],
    queryFn: getListElements,
  });

  if (isPending) {
  }

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    return (
      <DesktopWindow title={props.title} width={"20rem"} height={""}>
        <ListToolBar
          list={listElements}
          search={setSearch}
          form={formElements.toSpliced(formElements.length - 1)}
        />
        <div className="w-full flex flex-col max-h-60 overflow-y-scroll">
          {listElements.map((listElement) => {
            const id: string = Object.values(listElement)[
              Object.keys(listElement).length - 1
            ] as string;
            return (
              <>
                {subStringer(listElement) && (
                  <div
                    id={
                      isOpen(Object.values(listElement)[0] as string)
                        ? "border-pressed"
                        : "border"
                    }
                    className="flex w-full h-full justify-between items-center p-2 hover:cursor-pointer"
                    key={id}
                    onClick={() => getData(id)}
                  >
                    <>
                      {Object.values(listElement).map((data, index: number) => {
                        if (index < Object.keys(listElement).length - 1) {
                          if ((data as string) !== "") {
                            return <div key={index + id}>{data as string}</div>;
                          }
                        }
                      })}
                    </>
                  </div>
                )}
              </>
            );
          })}
        </div>
        {props.actionNeeded && (
          <>
            <div id="button-i">
              <div onClick={() => props.submit(listElements)} id="button">
                Action
              </div>
            </div>
          </>
        )}

        {(admin || !props.adminNeeded) && (
          <Form api={props.api} formElements={formElements} />
        )}
      </DesktopWindow>
    );
  }
}
