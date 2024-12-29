import { Dispatch, SetStateAction } from "react";

export default function ListToolBar(props: {
  list: never[];
  form: string[];
  search: Dispatch<SetStateAction<string>>;
}) {
  console.log(props.list);

  console.log(props.form);

  return (
    <>
      <div className={"flex flex-row h-full w-full "}>
        <input
          id="search"
          onChange={(e) => {
            props.search(e.target.value);
          }}
        />
        <button id="button">Search</button>
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
