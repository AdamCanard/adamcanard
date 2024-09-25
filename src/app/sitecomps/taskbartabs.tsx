import { useContext } from "react";
import { TaskbarContext } from "./toplevel";
import AdminList from "../admincomps/adminlist";
import { BeerScreen } from "../admincomps/adminpage";
import DrinkForm from "../admincomps/drinkform";
import DrankForm from "../admincomps/drankform";
import DraggableWindow from "../semantics/draggablewindow";

export default function TaskbarTabs() {
  const { setWindows, windows, beers } = useContext(TaskbarContext);

  const handleClick = (window: JSX.Element) => {
    for (let i = 0; i < windows.length; i++) {
      if (windows[i].key == window.key) {
        const newWindows = windows.toSpliced(i, 1);
        console.log("windows", windows);
        console.log("newwindows", newWindows);
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
          setWindows([
            ...windows,
            <BeerScreen beers={beers} key={windows.length} />,
          ])
        }
      >
        Beers
      </div>
    </>
  );
}

function Drank() {
  const { listElements } = useContext(TaskbarContext);
  return (
    <DraggableWindow title="Drank" width={"72"} heigth={"2/3"}>
      <AdminList
        listElements={listElements.filter((element) => element.Drank == true)}
      />
      <DrankForm />
    </DraggableWindow>
  );
}
function Drink() {
  const { listElements } = useContext(TaskbarContext);
  return (
    <DraggableWindow title="Drink" width={"72"} heigth={"2/3"}>
      <AdminList
        listElements={listElements.filter((element) => element.Drank == false)}
      />
      <DrinkForm />
    </DraggableWindow>
  );
}
