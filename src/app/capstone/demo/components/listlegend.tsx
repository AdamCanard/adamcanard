import { useContext } from "react";
import { ListContext } from "./list";

export default function ListLegend(props: { keys: string[] }) {
  const { valuesToDisplay } = useContext(ListContext);
  return (
    <div
      className={
        "flex flex-row gap-2 border-b-2 border-text justify-around h-12 w-full bg-primary p-2"
      }
    >
      {props.keys.map((key) => {
        if (valuesToDisplay[key] !== undefined)
          return (
            <div
              className={
                "flex flex-row w-full justify-center text-center items-center font-bold"
              }
              key={key}
            >
              {valuesToDisplay[key]}
            </div>
          );
      })}
    </div>
  );
}
