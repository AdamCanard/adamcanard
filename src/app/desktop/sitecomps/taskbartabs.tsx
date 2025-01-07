"use client";
import { useContext } from "react";
import BlackJack from "../blackjackcomps/blackjackgame";
import AdminPanel from "../adminpanel";
import Windows from "../windows";
import Lister from "../listcomps/lister";
import { TaskbarContext } from "../taskbarcontext";
import UserPanel from "../userpanel";

export default function TaskbarTabs() {
  const { openWindow, admin, user, isOpen } = useContext(TaskbarContext);

  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div className={"flex flex-row"}>
        <div
          id={isOpen("Lists") ? "button-taskbar-pressed" : "button-taskbar"}
          onClick={() => openWindow(<Lister key={"Lists"} />)}
        >
          Lists
        </div>

        <div
          id={isOpen("BlackJack") ? "button-taskbar-pressed" : "button-taskbar"}
          onClick={() => openWindow(<BlackJack key={"BlackJack"} />)}
        >
          BlackJack
        </div>
      </div>

      <div className={"flex flex-row"}>
        {admin && (
          <>
            <div
              id={
                isOpen("Windows") ? "button-taskbar-pressed" : "button-taskbar"
              }
              onClick={() => {
                openWindow(<Windows key={"Windows"} />);
              }}
            >
              Windows
            </div>{" "}
          </>
        )}

        <div
          id={isOpen(user.Name) ? "button-taskbar-pressed" : "button-taskbar"}
          onClick={() => {
            openWindow(<UserPanel key={user.Name} />);
          }}
        >
          {user.Name}
        </div>
        <div
          id={isOpen("Admin") ? "button-taskbar-pressed" : "button-taskbar"}
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
