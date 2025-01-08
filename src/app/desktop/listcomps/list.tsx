"use client";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";

import Form from "./form";
import ListToolBar from "./listtoolbar";
import { TaskbarContext } from "../taskbarcontext";
import ListedData from "./listeddata";

export default function List(props: {
  title: string;
  adminNeeded: boolean;
  submit: (arg0: never[]) => void;
  actionNeeded: boolean;
}) {
  const { admin } = useContext(TaskbarContext);
  const [listElements, setListElements] = useState([]);
  const [formElements, setFormElements] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const getListElements = useCallback(async () => {
    try {
      const response = await fetch("/api/list/" + props.title, {
        method: "GET",
      });
      const listResponse = await response.json();

      setListElements(listResponse.toReversed());
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
  }, [props.title]);

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
        <ListedData
          list={listElements}
          form={formElements}
          title={props.title}
          search={search}
        />

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
          <Form formElements={formElements} title={props.title} />
        )}
      </DesktopWindow>
    );
  }
}
