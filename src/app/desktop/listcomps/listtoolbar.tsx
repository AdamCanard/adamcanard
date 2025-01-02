import { Dispatch, SetStateAction } from "react";

export default function ListToolBar(props: {
  list: never[];
  form: string[];
  search: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <div id="boxshadow" className={"flex flex-row  w-full "}>
        <div className={"mt-1"}>Search:</div>
        <input
          id="search"
          onChange={(e) => {
            props.search(e.target.value);
          }}
        />
      </div>
      <div id="border" className={"h-6 flex flex-col justify-center"}>
        <div className={"text-xs flex flex-row justify-between"}>
          {props.form.map((value, index) => {
            return <div key={index}>{value}:</div>;
          })}
        </div>
      </div>
    </>
  );
}
