"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Form from "../../desktop/listcomps/form";
import { Loading } from "../../desktop/sitecomps/toplevel";
import ListToolBar from "@/app/desktop/listcomps/listtoolbar";
export default function MobileList(props: { api: string; open: boolean }) {
  const [listElements, setListElements] = useState([]);
  const [formElements, setFormElements] = useState<string[]>([]);

  const [search, setSearch] = useState<string>("");
  const getListElements = async () => {
    try {
      const response = await fetch(props.api, { method: "GET" });
      const listResponse = await response.json();

      setFormElements(Object.keys(listResponse[0]));
      setListElements(listResponse);
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
  };

  const subStringer = (element: object) => {
    const list = Object.values(element);
    let subStringed = "";
    for (let i = 0; i < list.length - 1; i++) {
      subStringed += list[i] + " ";
    }
    return subStringed.indexOf(search) !== -1;
  };

  const { isPending, isError, error, isSuccess } = useQuery({
    queryKey: [props.api],
    queryFn: getListElements,
  });

  if (isPending) {
    <Loading />;
  }

  if (isError) {
    console.log(error);
  }

  if (isSuccess) {
    return (
      <>
        <ListToolBar
          list={listElements}
          search={setSearch}
          form={formElements.toSpliced(formElements.length - 1)}
        />
        <div id="listHeight" className={"flex flex-col"}>
          <div className="overflow-y-scroll w-full flex flex-col">
            {listElements.map((listElement) => {
              const id: string = Object.values(listElement)[
                Object.keys(listElement).length - 1
              ] as string;
              return (
                <>
                  {subStringer(listElement) && (
                    <>
                      <div
                        id="border"
                        className="flex w-full h-full justify-between items-center p-2"
                        key={id}
                      >
                        <>
                          {Object.values(listElement).map(
                            (data, index: number) => {
                              if (index < Object.keys(listElement).length - 1) {
                                if ((data as string) !== "") {
                                  return (
                                    <div key={index + id}>{data as string}</div>
                                  );
                                }
                              }
                            },
                          )}
                        </>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>{" "}
          {props.open && (
            <div id="boxshadow">
              <Form api={props.api} formElements={formElements} />{" "}
            </div>
          )}
        </div>
      </>
    );
  }
}
