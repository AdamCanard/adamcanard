"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MobileListData from "./mobilelistdata";
import ListToolBar from "@/app/desktop/listcomps/listtoolbar";
import Loading from "@/app/desktop/sitecomps/loading";
export default function MobileList(props: { open: boolean; title: string }) {
  const [listElements, setListElements] = useState<object[]>([]);
  const [formElements, setFormElements] = useState<string[]>([]);
  const [groupBy, setGroupBy] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const getListElements = async () => {
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
          setGroup={setGroupBy}
          group={groupBy}
        />
        <div className={"flex flex-col h-fit overflow-y-scroll"}>
          <MobileListData
            list={listElements}
            form={formElements}
            title={props.title}
            search={search}
            group={groupBy}
          />
        </div>
      </>
    );
  }
}
