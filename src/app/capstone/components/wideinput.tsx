import { useState } from "react";

export default function WideInput(props: {
  title: string;
  name: string;
  type: string;
  placeholder: string;
}) {
  const [value, setValue] = useState("");
  return (
    <div className={"flex flex-col gap-1"}>
      <label className={"text-left text-md text-text font-bold"}>
        {props.title}
        <input
          className={"w-full border-2 border-text p-2 font-normal rounded-md"}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          value={value}
          onChange={(e) => {
            if (props.type === "number") {
              setValue(e.target.value.replace(/\D/g, ""));
            } else {
              setValue(e.target.value);
            }
          }}
        />
      </label>
    </div>
  );
}
