import { useContext } from "react";
import { TaskbarContext } from "../layout";

export default function WindowManager() {
  const { windows } = useContext(TaskbarContext);

  return (
    <>
      {windows.map((tab: JSX.Element) => {
        return <div key={tab.key}>{tab}</div>;
      })}
    </>
  );
}
