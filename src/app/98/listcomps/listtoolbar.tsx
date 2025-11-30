import { Omit } from "@/app/omit";
import { Dispatch, SetStateAction } from "react";

export default function ListToolBar(props: {
  list: object[];
  form: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  setGroup: Dispatch<SetStateAction<string>>;
  group: string;
}) {
  const handleClick = (value: string) => {
    props.setGroup(value);
  };
  return (
    <div className={"h-16"}>
      <div id="boxshadow" className={"flex flex-row w-full h-10"}>
        <div className={"mt-1"}>Search:</div>
        <input
          id="search"
          onChange={(e) => {
            props.setSearch(e.target.value);
          }}
        />
      </div>
      <div id="border" className={"h-6 flex flex-col justify-center"}>
        <div className={"text-xs flex flex-row justify-between"}>
          {props.form.map((value, index) => {
            if (!Omit.includes(props.form[index]) && value !== props.group) {
              return (
                <div
                  onClick={() => {
                    handleClick(value);
                  }}
                  key={index}
                >
                  {value}:
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
