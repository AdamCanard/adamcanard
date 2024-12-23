import { useContext, useEffect, useState } from "react";
import { FormContext } from "./form";

export default function Input(props: { value: string; name?: string }) {
  const { clear, setClear } = useContext(FormContext);
  const [value, setValue] = useState(props.value || "");

  useEffect(() => {
    if (clear == true) {
      setValue("");
      setClear(false);
    }
  }, [clear, setClear]);
  return (
    <>
      <label id="border" className="flex justify-between w-full text-sm">
        Enter {props.name || props.value}:
        <input
          className={"text-right"}
          autoComplete="off"
          type="text"
          name={props.name || props.value}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
    </>
  );
}
