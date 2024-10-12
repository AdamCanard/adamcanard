import { Dispatch, SetStateAction } from "react";

export function LabeledInputStr(props: {
  required: boolean;
  title: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <label id="border" className="flex justify-between w-full text-sm">
        Enter {props.title}:
        {props.required ? (
          <input
            required
            type="text"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
          />
        ) : (
          <input
            type="text"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(e.target.value)}
          />
        )}
      </label>
    </>
  );
}

export function LabeledInputNum(props: {
  required: boolean;
  title: string;
  state: number;
  setState: Dispatch<SetStateAction<number>>;
}) {
  return (
    <>
      <label id="border" className="flex justify-between w-full text-sm">
        Enter {props.title}:
        {props.required ? (
          <input
            required
            type="text"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(+e.target.value)}
          />
        ) : (
          <input
            type="text"
            name={props.title}
            value={props.state}
            onChange={(e) => props.setState(+e.target.value)}
          />
        )}
      </label>
    </>
  );
}