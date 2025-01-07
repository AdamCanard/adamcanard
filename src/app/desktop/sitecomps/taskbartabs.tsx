"use client";
import { useContext } from "react";
import BlackJack from "../blackjackcomps/blackjackgame";
import AdminPanel from "../adminpanel";
import Windows from "../windows";
import Lister from "../listcomps/lister";
import { TaskbarContext } from "../taskbarcontext";

export default function TaskbarTabs() {
  const { openWindow, admin, username } = useContext(TaskbarContext);

  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div className={"flex flex-row"}>
        <div
          id="button-taskbar"
          onClick={() => openWindow(<Lister key={"Lists"} />)}
        >
          Lists
        </div>

        <div
          id="button-taskbar"
          onClick={() => openWindow(<BlackJack key={"BlackJack"} />)}
        >
          BlackJack
        </div>
      </div>

      <div className={"flex flex-row"}>
        {admin && (
          <>
            <div
              id="button-taskbar"
              onClick={() => {
                openWindow(<Windows key={"Windows"} />);
              }}
            >
              Windows
            </div>{" "}
          </>
        )}

        <div id="button-taskbar">{username}</div>
        <div
          id="button-taskbar"
          onClick={() => {
            openWindow(<AdminPanel key={"Admin"} />);
          }}
        >
          Admin
        </div>
      </div>
    </div>
  );
}
