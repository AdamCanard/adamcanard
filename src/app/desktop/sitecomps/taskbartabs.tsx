"use client";
import { useContext } from "react";
import BlackJack from "../blackjackcomps/blackjackgame";
import AdminPanel from "../adminpanel";
import Windows from "../windows";
import Lister from "../listcomps/lister";
import { TaskbarContext } from "../taskbarcontext";
import UserPanel from "../userpanel";
import Test from "@/app/test";
import { TaskbarButton } from "./taskbarbutton";
import WindowedMobile from "../windowedmobile";

export default function TaskbarTabs() {
  const { admin, user, setAdmin } = useContext(TaskbarContext);

  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div className={"flex flex-row"}>
        <TaskbarButton window={<Lister key={"Lists"} />} />
        <TaskbarButton window={<BlackJack key={"BlackJack"} />} />
      </div>

      <div className={"flex flex-row"}>
        {admin && (
          <>
            <TaskbarButton window={<Windows key="Windows" />} />
            <TaskbarButton window={<WindowedMobile key="Mobile" />} />
            <TaskbarButton window={<Test key="Test" />} />
            <div
              id={"button-taskbar"}
              onClick={() => {
                setAdmin(false);
              }}
            >
              UnAuth
            </div>
          </>
        )}

        <TaskbarButton window={<UserPanel key={user.Name} />} />
        <TaskbarButton window={<AdminPanel key="Admin" />} />
      </div>
    </div>
  );
}
