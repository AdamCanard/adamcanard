import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import BeerList from "../beerlist";

import DrinkForm from "../drinkform";
import DrankForm from "../drankform";
import DraggableWindow from "../semanticcomps/draggablewindow";
import BlackJack from "../blackjackcomps/blackjackgame";
import SuggestionDesktop from "../suggestioncomps/suggestiondesktop";

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
        onClick={() => handleClick(<SuggestionDesktop key={"Suggestion"} />)}
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

function Drank() {
  const { listElements, windows, setWindows, admin } =
    useContext(TaskbarContext);
  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "Drank") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };
  return (
    <DraggableWindow
      title="Drank"
      width={"72"}
      heigth={"2/3"}
      windowKey="Drank"
      close={() => handleClose()}
    >
      <BeerList
        listElements={listElements.filter((element) => element.Drank == true)}
      />
      {admin && <DrankForm />}
    </DraggableWindow>
  );
}

function Drink() {
  const { listElements, windows, setWindows, admin } =
    useContext(TaskbarContext);
  const handleClose = () => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == "Drink") {
        const newWindows = windows.toSpliced(i, 1);
        setWindows(newWindows);
      }
    }
  };
  return (
    <DraggableWindow
      title="Drink"
      width={"72"}
      heigth={"2/3"}
      windowKey="Drink"
      close={() => handleClose()}
    >
      <BeerList
        listElements={listElements.filter((element) => element.Drank == false)}
      />
      {admin && <DrinkForm />}
    </DraggableWindow>
  );
}
