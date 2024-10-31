import { useContext } from "react";
import { TaskbarContext } from "./toplevel";

export default function WindowManager() {
  const { windows } = useContext(TaskbarContext);
  return (
    <>
      {windows.map((tab: JSX.Element) => {
        console.log(window);
        return <div key={tab.key}>{tab}</div>;
      })}
    </>
  );
}
