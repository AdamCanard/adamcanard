import { useContext } from "react";
import { TaskbarContext } from "./toplevel";

import BlackJack from "../blackjackcomps/blackjackgame";
import SuggestionDesktop from "../suggestioncomps/suggestiondesktop";
import Drank from "../listcomps/drank";
import Drink from "../listcomps/drink";

export default function TaskbarTabs() {
  const { setWindows, windows } = useContext(TaskbarContext);

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
    <>
      <div
        id="button-taskbar"
        onClick={() => handleClick(<Drank key={"Drank"} />)}
      >
        Drank
      </div>
      <div
        id="button-taskbar"
        onClick={() => handleClick(<Drink key={"Drink"} />)}
      >
        Drink
      </div>
      <div
        id="button-taskbar"
        onClick={() =>
          handleClick(<SuggestionDesktop key={"Suggest A Beer!"} />)
        }
      >
        Suggestion
      </div>
      <div
        id="button-taskbar"
        onClick={() => handleClick(<BlackJack key={"BlackJack"} />)}
      >
        BlackJack
      </div>
    </>
  );
}
