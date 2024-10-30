import { useContext } from "react";
import { TaskbarContext } from "../sitecomps/toplevel";
import BeerList from "../beerlist";
import DrinkForm from "../drinkform";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function Drink() {
  const { listElements, admin } = useContext(TaskbarContext);

  return (
    <DesktopWindow title="Drink" width={"20rem"} height={""}>
      <BeerList
        listElements={listElements.filter((element) => element.Drank == false)}
      />
      {admin && <DrinkForm />}
    </DesktopWindow>
  );
}
