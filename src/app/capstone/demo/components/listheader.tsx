import ListLegend from "./listlegend";
import { useContext } from "react";
import { ListContext } from "./list";

export default function ListHeader(props: { keys: string[] }) {
  const { name } = useContext(ListContext);

  return (
    <div className={"flex flex-col w-full"}>
      {" "}
      <div
        className={
          "flex justify-center items-center w-full h-12 bg-accent text-primary text-4xl font-bold p-4"
        }
      >
        {name}
      </div>{" "}
      {props.keys.length !== 0 && <ListLegend keys={props.keys} />}
    </div>
  );
}
