"use client";

import { Dispatch, SetStateAction, useState } from "react";
//import Image from "next/image";
import DesktopWindow from "./desktop/sitecomps/desktopwindow";
import ListBar from "./mobile/lists/listbar";
import MobileList from "./mobile/lists/mobilelist";

export default function Test() {
  const [list, setList] = useState("Beers");
  return (
    <DesktopWindow title="Test" width="20rem" height="20rem">
      <div className={"flex flex-col w-full h-full"}>
        <ListPicker picker={setList} />
        <ListRenderer list={<MobileList open={true} title={list} />} />
      </div>
    </DesktopWindow>
  );
}

function ListRenderer(props: { list: JSX.Element }) {
  return <>{props.list}</>;
}

function ListPicker(props: { picker: Dispatch<SetStateAction<string>> }) {
  return (
    <>
      <div id="TabBar" className={"flex flex-row justify-between"}>
        <div className={"w-full h-8 flex flex-row"}>
          <div
            id={"MTabButton"}
            className={
              "w-full h-full text-center leading-8 hover:cursor-pointer"
            }
            onClick={() => props.picker("Beers")}
          >
            Beers
          </div>{" "}
          <div
            id={"MTabButton"}
            className={
              "w-full h-full text-center leading-8 hover:cursor-pointer"
            }
            onClick={() => props.picker("Ideas")}
          >
            Ideas
          </div>{" "}
          <div
            id={"MTabButton"}
            className={
              "w-full h-full text-center leading-8 hover:cursor-pointer"
            }
            onClick={() => props.picker("Suggestion")}
          >
            Suggestion
          </div>{" "}
          <div
            id={"MTabButton"}
            className={
              "w-full h-full text-center leading-8 hover:cursor-pointer"
            }
            onClick={() => props.picker("Vinyls")}
          >
            Vinyls
          </div>{" "}
        </div>
      </div>
    </>
  );
}
