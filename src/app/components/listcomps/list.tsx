import { useQuery } from "@tanstack/react-query";
import { useCallback, useContext, useEffect, useState } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import { TaskbarContext } from "../sitecomps/toplevel";
import Form from "./form";

export default function List(props: {
  title: string;
  api: string;
  itemHandleClick: (arg0: string) => void;
  adminNeeded: boolean;
  submit: (arg0: never[]) => void;
  actionNeeded: boolean;
}) {
  const { admin } = useContext(TaskbarContext);
  const [listElements, setListElements] = useState([]);
  const [formElements, setFormElements] = useState<string[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

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

  useEffect(() => {
    if (refresh) {
      getListElements();
      setRefresh(false);
    }
  }, [refresh, getListElements]);

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
        <div className="w-full flex flex-col max-h-60 overflow-y-scroll">
          {listElements.map((listElement) => {
            const id: string = Object.values(listElement)[
              Object.keys(listElement).length - 1
            ] as string;
            return (
              <div
                id="border"
                className="flex w-full h-full justify-between items-center p-2 hover:cursor-pointer"
                key={id}
                onClick={() => props.itemHandleClick(id)}
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
