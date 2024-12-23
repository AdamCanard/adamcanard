import { useContext } from "react";
import { TaskbarContext } from "./toplevel";

import BlackJack from "../blackjackcomps/blackjackgame";
import AdminPanel from "../adminpanel";
import CurrentDrink from "../currentdrink";
import Windows from "../windows";
import Lister from "../listcomps/lister";

export default function TaskbarTabs() {
  const { setWindows, windows, admin, username } = useContext(TaskbarContext);

  const handleClick = (window: JSX.Element) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == window.key) {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
        return;
      }
    }
    setWindows([...windows, window]);
  };

  return (
    <div className={"flex flex-row w-full justify-between"}>
      <div className={"flex flex-row"}>
        <div
          id="button-taskbar"
          onClick={() => handleClick(<Lister key={"Lists"} />)}
        >
          Lists
        </div>

        <div
          id="button-taskbar"
          onClick={() => handleClick(<BlackJack key={"BlackJack"} />)}
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
                handleClick(<CurrentDrink key={"Drink A Beer!"} />);
              }}
            >
              Drink Beer
            </div>
            <div
              id="button-taskbar"
              onClick={() => {
                handleClick(<Windows key={"Windows"} />);
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
            handleClick(<AdminPanel key={"Admin"} />);
          }}
        >
          Admin
        </div>
      </div>
    </div>
  );
}
//<>
//  <div id="button-taskbar" onClick={() => handleClick(<Drank key={"Drank"} />)}>
//    Drank
//  </div>
//  <div id="button-taskbar" onClick={() => handleClick(<Drink key={"Drink"} />)}>
//    Drink
//  </div>
//</>;
