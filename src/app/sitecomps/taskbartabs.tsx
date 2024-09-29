import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import AdminList from "../admincomps/adminlist";

import DrinkForm from "../admincomps/drinkform";
import DrankForm from "../admincomps/drankform";
import DraggableWindow from "../semantics/draggablewindow";

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
      {/* <div
        id="button-taskbar"
        onClick={() => handleClick(<BlackJack key={"BlackJack"} />)}
      >
        BJ
      </div> */}
    </>
  );
}

function Drank() {
  const { listElements, windows, setWindows } = useContext(TaskbarContext);
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
      close={() => handleClose()}
    >
      <AdminList
        listElements={listElements.filter((element) => element.Drank == true)}
      />
      <DrankForm />
    </DraggableWindow>
  );
}
function Drink() {
  const { listElements, windows, setWindows } = useContext(TaskbarContext);
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
      close={() => handleClose()}
    >
      <AdminList
        listElements={listElements.filter((element) => element.Drank == false)}
      />
      <DrinkForm />
    </DraggableWindow>
  );
}
