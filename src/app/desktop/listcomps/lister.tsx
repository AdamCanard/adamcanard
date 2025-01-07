import { useContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import List from "./list";
import { TaskbarContext } from "../taskbarcontext";

export default function Lister() {
  const { isOpen, openWindow } = useContext(TaskbarContext);

  //const randomOutput = (data: never[]) => {
  //  alert(Object.values(data[Math.floor(Math.random() * data.length)])[0]);
  //};
  return (
    <DesktopWindow title="Lists" width={"8rem"} height={""}>
      {lists.map((collection: string) => {
        return (
          <div
            id={
              isOpen(collection) ? "button-taskbar-pressed" : "button-taskbar"
            }
            key={collection}
            onClick={() =>
              openWindow(
                <List
                  title={collection}
                  key={collection}
                  adminNeeded={true}
                  submit={() => {}}
                  actionNeeded={false}
                />,
              )
            }
          >
            {collection}
          </div>
        );
      })}
    </DesktopWindow>
  );
}

const lists = ["Beers", "Suggestion", "Ideas", "Books", "Vinyls"];
