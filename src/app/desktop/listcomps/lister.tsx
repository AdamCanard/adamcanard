import { useContext } from "react";
import DesktopWindow from "../sitecomps/desktopwindow";
import List from "./list";
import { TaskbarContext } from "../taskbarcontext";
import { Collections } from "@/app/collections";

export default function Lister() {
  const { isOpen, openWindow } = useContext(TaskbarContext);

  //const randomOutput = (data: never[]) => {
  //  alert(Object.values(data[Math.floor(Math.random() * data.length)])[0]);
  //};
  return (
    <DesktopWindow title="Lists" width={"8rem"} height={""}>
      {Object.keys(Collections).map((collection: string, index: number) => {
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
                  adminNeeded={!Object.values(Collections)[index]}
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
