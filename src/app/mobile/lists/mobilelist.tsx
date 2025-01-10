"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Form from "../../desktop/listcomps/form";
import ListToolBar from "@/app/desktop/listcomps/listtoolbar";
import Loading from "@/app/desktop/sitecomps/loading";
import { Omit } from "@/app/omit";
export default function MobileList(props: { open: boolean; title: string }) {
  const [listElements, setListElements] = useState<object[]>([]);
  const [formElements, setFormElements] = useState<string[]>([]);

  const [search, setSearch] = useState<string>("");
  const getListElements = async () => {
    try {
      const response = await fetch("/api/list/" + props.title, {
        method: "GET",
      });
      const listResponse = await response.json();

      setListElements(
        objectStructureing(
          listStructuring(Object.keys(listResponse[0])),
          listResponse.toReversed(),
        ),
      );

      setFormElements(listStructuring(Object.keys(listResponse[0])));
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

  const listStructuring = (form: string[]) => {
    const newForm: string[] = [];
    let uniqueIndex: number = 0;
    for (let i = 0; i < form.length; i++) {
      if (form[i].charAt(0) === "_") {
        newForm[0] = form[i].slice(1);
        uniqueIndex = i;
      }
    }
    for (let i = 0; i < form.length; i++) {
      if (uniqueIndex !== i) {
        newForm.push(form[i]);
      }
    }
    return newForm;
  };

  const objectStructureing = (form: string[], list: never[]) => {
    const newList: object[] = [];
    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      const newElement = {};
      const unique = "_" + form[0];
      const uniqueCorrect = form[0];
      for (let j = 0; j < Object.values(element).length; j++) {
        const objectKey = form[j];
        //@ts-expect-error it needs to be any
        newElement[objectKey] = element[objectKey];
      }
      //@ts-expect-error it needs to be any
      newElement[uniqueCorrect] = element[unique];
      newList.push(newElement);
    }
    return newList;
  };

  const { isPending, isError, error, isSuccess } = useQuery({
    queryKey: [props.title],
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
          setSearch={setSearch}
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
                              if (!Omit.includes(formElements[index])) {
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
              <Form formElements={formElements} title={props.title} />{" "}
            </div>
          )}
        </div>
      </>
    );
  }
}
