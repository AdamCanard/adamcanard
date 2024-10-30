import { useContext } from "react";
import { TaskbarContext } from "../sitecomps/toplevel";
import BeerList from "../beerlist";
import DrankForm from "../drankform";
import DesktopWindow from "../sitecomps/desktopwindow";

export default function Drank() {
  const { listElements, admin } = useContext(TaskbarContext);

  return (
    <DesktopWindow title="Drank" width={"20rem"} height={""}>
      <BeerList
        listElements={listElements.filter((element) => element.Drank == true)}
      />
      {admin && <DrankForm />}
    </DesktopWindow>
  );
}
