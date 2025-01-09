import { Dispatch, SetStateAction } from "react";
import { Omit } from "../../omit";

export default function ListToolBar(props: {
  list: object[];
  form: string[];
  setSearch: Dispatch<SetStateAction<string>>;
  setGroup?: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div id="boxshadow" className={"flex flex-row  w-full "}>
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
            if (!Omit.includes(props.form[index])) {
              return <div key={index}>{value}:</div>;
            }
          })}
        </div>
      </div>
    </>
  );
}
